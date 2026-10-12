import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CandidateProfile } from '../../types/recommendation';
import { UserProfile } from '../../types/user';
import { Heart, MessageSquare, Sparkles, X } from 'lucide-react';
import { Button } from '../ui/Button';
import confetti from 'canvas-confetti';

interface MatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: CandidateProfile | null;
  currentUser: UserProfile;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  isOpen,
  onClose,
  candidate,
  currentUser
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#8B0000', '#C41527', '#4A0007', '#FFFFFF', '#660000']
        });
      } catch (e) {
        // Safe fallback if canvas-confetti is not loaded
      }
    }
  }, [isOpen]);

  if (!isOpen || !candidate) return null;

  const handleStartChat = () => {
    onClose();
    navigate('/messages');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Main card */}
      <div className="relative w-full max-w-md bg-[#121014] border border-[#8B0000]/40 rounded-3xl p-8 text-center shadow-[0_0_60px_rgba(139,0,0,0.5)] z-10 overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Ambient background glow */}
        <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#8B0000]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 bg-[#4A0007]/40 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0000]/25 border border-[#C41527]/50 text-[#C41527] text-xs font-semibold uppercase tracking-widest mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Mutual Connection</span>
        </div>

        <h3 className="font-serif text-3xl font-bold text-white mb-2">
          It's a Match.
        </h3>
        <p className="text-sm text-zinc-300 max-w-xs mx-auto mb-6">
          You and <span className="text-white font-medium">{candidate.firstName}</span> both liked each other with a predicted behavioral compatibility of <span className="text-[#C41527] font-bold">{candidate.compatibilityScore}%</span>.
        </p>

        {/* Intersecting Photo Avatars with Heart */}
        <div className="relative flex items-center justify-center py-4 mb-8">
          {/* User photo */}
          <div className="relative z-10 w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-[#8B0000] to-white/40 shadow-xl -mr-4 transform -rotate-3 hover:rotate-0 transition-transform">
            <img
              src={currentUser.photos[0] || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}
              alt={currentUser.firstName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>

          {/* Central Pulsing Heart Badge */}
          <div className="relative z-30 w-12 h-12 rounded-full bg-[#8B0000] text-white flex items-center justify-center shadow-[0_0_25px_rgba(196,21,39,0.9)] border-2 border-[#121014] animate-pulse">
            <Heart className="w-6 h-6 fill-current" />
          </div>

          {/* Candidate photo */}
          <div className="relative z-10 w-24 h-24 rounded-full p-1 bg-gradient-to-tl from-[#8B0000] to-white/40 shadow-xl -ml-4 transform rotate-3 hover:rotate-0 transition-transform">
            <img
              src={candidate.photos[0]}
              alt={candidate.firstName}
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <Button
            variant="glow"
            size="lg"
            className="w-full bg-gradient-to-r from-[#B3001B] via-[#8B0000] to-[#59000C]"
            icon={<MessageSquare className="w-4 h-4" />}
            onClick={handleStartChat}
          >
            Send a Message
          </Button>

          <Button
            variant="secondary"
            size="md"
            className="w-full"
            onClick={onClose}
          >
            Keep Swiping
          </Button>
        </div>
      </div>
    </div>
  );
};
