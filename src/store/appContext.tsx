import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile } from '../types/user';
import { CandidateProfile } from '../types/recommendation';
import { Match, LikeReceived } from '../types/match';
import { Conversation, ChatMessage } from '../types/message';
import { mockCurrentUser, mockCandidates, mockLikesReceived } from '../data/mockUsers';
import { initialMockMatches } from '../data/mockMatches';
import { mockConversations } from '../data/mockMessages';
import { recommendationsApi } from '../services/recommendationsApi';

interface AppContextType {
  currentUser: UserProfile;
  isAuthenticated: boolean;
  candidates: CandidateProfile[];
  currentIndex: number;
  currentCandidate: CandidateProfile | null;
  selectedCandidateForAnalysis: CandidateProfile | null;
  matches: Match[];
  likesReceived: LikeReceived[];
  conversations: Conversation[];
  activeConversationId: string | null;
  mutualMatchModalCandidate: CandidateProfile | null;
  
  // Actions
  handleLike: (candidateId: string) => Promise<void>;
  handlePass: (candidateId: string) => Promise<void>;
  handleSuperlike: (candidateId: string) => Promise<void>;
  handleLikeBack: (likeReceived: LikeReceived) => void;
  resetDeck: () => void;
  setCurrentCandidateIndex: (index: number) => void;
  setSelectedCandidateForAnalysis: (candidate: CandidateProfile | null) => void;
  closeMatchModal: () => void;
  sendMessage: (conversationId: string, text: string) => void;
  setActiveConversationId: (id: string | null) => void;
  updateUserInterests: (interests: string[]) => void;
  updateUserProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  signOut: () => void;
  signIn: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('velora_mock_user');
    return saved ? JSON.parse(saved) : mockCurrentUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const savedAuth = localStorage.getItem('velora_mock_auth');
    return savedAuth !== null ? JSON.parse(savedAuth) : true;
  });

  const [candidates, setCandidates] = useState<CandidateProfile[]>(mockCandidates);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedCandidateForAnalysis, setSelectedCandidateForAnalysis] = useState<CandidateProfile | null>(null);
  
  const [matches, setMatches] = useState<Match[]>(() => {
    const saved = localStorage.getItem('velora_mock_matches');
    return saved ? JSON.parse(saved) : initialMockMatches;
  });

  const [likesReceived, setLikesReceived] = useState<LikeReceived[]>(mockLikesReceived);
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('velora_mock_conversations');
    return saved ? JSON.parse(saved) : mockConversations;
  });

  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_aanya');
  const [mutualMatchModalCandidate, setMutualMatchModalCandidate] = useState<CandidateProfile | null>(null);

  // Sync to non-sensitive session storage
  useEffect(() => {
    localStorage.setItem('velora_mock_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('velora_mock_auth', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('velora_mock_matches', JSON.stringify(matches));
  }, [matches]);

  useEffect(() => {
    localStorage.setItem('velora_mock_conversations', JSON.stringify(conversations));
  }, [conversations]);

  const currentCandidate = currentIndex < candidates.length ? candidates[currentIndex] : null;

  const handleLike = async (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId) || currentCandidate;
    if (!candidate) return;

    // Check interaction with service
    const response = await recommendationsApi.recordInteraction(candidateId, 'like');

    // Advance candidate index
    setCurrentIndex(prev => prev + 1);

    if (response.isMutualMatch) {
      // Trigger mutual match modal
      setMutualMatchModalCandidate(candidate);

      // Add to matches if not already present
      if (!matches.some(m => m.candidateId === candidate.id)) {
        const newMatch: Match = {
          id: `match_${Date.now()}`,
          candidateId: candidate.id,
          candidate,
          matchedAt: 'Just now',
          compatibilityScore: candidate.compatibilityScore,
          lastInteraction: 'New match! Start the conversation.',
          unreadCount: 0
        };
        setMatches(prev => [newMatch, ...prev]);

        // Add or ensure conversation exists
        if (!conversations.some(c => c.participantId === candidate.id)) {
          const newConv: Conversation = {
            id: `conv_${candidate.id}`,
            participantId: candidate.id,
            participantName: candidate.firstName,
            participantAvatar: candidate.photos[0],
            participantAge: candidate.age,
            verified: candidate.verified,
            lastMessage: 'Matched with VÉLORA AI compatibility',
            lastMessageTime: 'Just now',
            unreadCount: 0,
            online: true,
            messages: []
          };
          setConversations(prev => [newConv, ...prev]);
        }
      }
    }
  };

  const handlePass = async (candidateId: string) => {
    await recommendationsApi.recordInteraction(candidateId, 'pass');
    setCurrentIndex(prev => prev + 1);
  };

  const handleSuperlike = async (candidateId: string) => {
    const candidate = candidates.find(c => c.id === candidateId) || currentCandidate;
    if (!candidate) return;

    await recommendationsApi.recordInteraction(candidateId, 'superlike');
    setCurrentIndex(prev => prev + 1);

    // Superlike triggers instant match celebration for demo purposes
    setMutualMatchModalCandidate(candidate);
    if (!matches.some(m => m.candidateId === candidate.id)) {
      const newMatch: Match = {
        id: `match_sl_${Date.now()}`,
        candidateId: candidate.id,
        candidate,
        matchedAt: 'Just now (Super Like)',
        compatibilityScore: candidate.compatibilityScore,
        lastInteraction: 'Super Liked!',
        unreadCount: 0
      };
      setMatches(prev => [newMatch, ...prev]);
    }
  };

  const handleLikeBack = (likeItem: LikeReceived) => {
    // Remove from received likes
    setLikesReceived(prev => prev.filter(l => l.id !== likeItem.id));

    // Show celebration modal
    setMutualMatchModalCandidate(likeItem.candidate);

    // Add to matches
    if (!matches.some(m => m.candidateId === likeItem.candidate.id)) {
      const newMatch: Match = {
        id: `match_${Date.now()}`,
        candidateId: likeItem.candidate.id,
        candidate: likeItem.candidate,
        matchedAt: 'Just now',
        compatibilityScore: likeItem.candidate.compatibilityScore,
        lastInteraction: 'Mutual Match!',
        unreadCount: 0
      };
      setMatches(prev => [newMatch, ...prev]);

      // Add conversation
      const newConv: Conversation = {
        id: `conv_${likeItem.candidate.id}`,
        participantId: likeItem.candidate.id,
        participantName: likeItem.candidate.firstName,
        participantAvatar: likeItem.candidate.photos[0],
        participantAge: likeItem.candidate.age,
        verified: likeItem.candidate.verified,
        lastMessage: 'Mutual match!',
        lastMessageTime: 'Just now',
        unreadCount: 0,
        online: true,
        messages: []
      };
      setConversations(prev => [newConv, ...prev]);
    }
  };

  const resetDeck = () => {
    setCurrentIndex(0);
  };

  const closeMatchModal = () => {
    setMutualMatchModalCandidate(null);
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;

    const newMessage: ChatMessage = {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      recipientId: conversationId,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === conversationId) {
          return {
            ...c,
            lastMessage: text.trim(),
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      })
    );

    // Optional simulated reply after 2.5 seconds to feel alive and dynamic!
    setTimeout(() => {
      const replies = [
        "That's so thoughtful! Tell me more about that.",
        "I couldn't agree more. VÉLORA's compatibility score really wasn't kidding!",
        "Haha, absolutely! Would love to chat more about this over coffee sometime.",
        "That genuinely made me smile 😊"
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const replyMessage: ChatMessage = {
        id: `msg_reply_${Date.now()}`,
        senderId: conversationId,
        recipientId: 'me',
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'delivered'
      };

      setConversations(currentConvs =>
        currentConvs.map(conv => {
          if (conv.id === conversationId) {
            return {
              ...conv,
              lastMessage: randomReply,
              lastMessageTime: 'Just now',
              messages: [...conv.messages, replyMessage]
            };
          }
          return conv;
        })
      );
    }, 2000);
  };

  const updateUserInterests = (interests: string[]) => {
    setCurrentUser(prev => ({
      ...prev,
      interests
    }));
  };

  const updateUserProfile = (updates: Partial<UserProfile>) => {
    setCurrentUser(prev => ({
      ...prev,
      ...updates
    }));
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    const updated: UserProfile = {
      ...currentUser,
      ...data,
      isProfileComplete: true
    };
    setCurrentUser(updated);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('velora_mock_auth');
  };

  const signIn = () => {
    setIsAuthenticated(true);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        candidates,
        currentIndex,
        currentCandidate,
        selectedCandidateForAnalysis,
        matches,
        likesReceived,
        conversations,
        activeConversationId,
        mutualMatchModalCandidate,
        handleLike,
        handlePass,
        handleSuperlike,
        handleLikeBack,
        resetDeck,
        setCurrentCandidateIndex: setCurrentIndex,
        setSelectedCandidateForAnalysis,
        closeMatchModal,
        sendMessage,
        setActiveConversationId,
        updateUserInterests,
        updateUserProfile,
        completeOnboarding,
        signOut,
        signIn
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

