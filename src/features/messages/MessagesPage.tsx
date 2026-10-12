import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../store/appContext';
import { 
  Send, CheckCheck, CheckCircle2, MessageSquare, 
  Search, Phone, Video, MoreVertical, Sparkles 
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';

export const MessagesPage: React.FC = () => {
  const { conversations, activeConversationId, setActiveConversationId, sendMessage } = useApp();
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputText);
    setInputText('');
  };

  const filteredConversations = conversations.filter(c =>
    c.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-6.5rem)] flex rounded-3xl overflow-hidden bg-[#141418] border border-white/10 shadow-2xl">
      
      {/* Left Column: Conversation List */}
      <div className="w-80 lg:w-96 border-r border-white/10 flex flex-col bg-[#101014]">
        {/* Header & Search */}
        <div className="p-4 border-b border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white tracking-wide">Conversations</h2>
            <span className="text-xs font-mono text-zinc-400">
              {conversations.length} total
            </span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter messages..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF3B5C]"
            />
          </div>
        </div>

        {/* Conversation list items */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/[0.04]">
          {filteredConversations.map((conv) => {
            const isActive = activeConv?.id === conv.id;

            return (
              <div
                key={conv.id}
                onClick={() => setActiveConversationId(conv.id)}
                className={`flex items-center gap-3 p-3.5 cursor-pointer transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF3B5C]/15 to-transparent border-l-2 border-[#FF3B5C]'
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={conv.participantAvatar}
                    alt={conv.participantName}
                    className="w-11 h-11 rounded-full object-cover border border-white/10"
                  />
                  {conv.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#101014]" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-white truncate flex items-center gap-1">
                      {conv.participantName}
                      {conv.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF3B5C] fill-[#FF3B5C]/20" />}
                    </span>
                    <span className="text-[10px] text-zinc-500 flex-shrink-0">{conv.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate">
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[#FF3B5C] text-white text-[9px] font-bold flex items-center justify-center flex-shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Column: Active Conversation */}
      {activeConv ? (
        <div className="flex-1 flex flex-col bg-[#141418]">
          {/* Conversation Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#121216]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConv.participantAvatar}
                  alt={activeConv.participantName}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                />
                {activeConv.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-[#141418]" />
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>{activeConv.participantName}, {activeConv.participantAge}</span>
                  {activeConv.verified && (
                    <CheckCircle2 className="w-4 h-4 text-[#FF3B5C] fill-[#FF3B5C]/20" />
                  )}
                </h3>
                <p className="text-[11px] text-zinc-400">
                  {activeConv.online ? 'Online now' : 'Active today'} • Matched via VÉLORA Deep Learning
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-zinc-400">
              <button
                type="button"
                className="p-2 rounded-full hover:bg-white/5 hover:text-white transition-colors"
                title="Audio call"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-white/5 hover:text-white transition-colors"
                title="Video call"
              >
                <Video className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-white/5 hover:text-white transition-colors"
                title="Options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Match introduction banner inside chat */}
            <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 text-center max-w-sm mx-auto mb-6">
              <Sparkles className="w-4 h-4 text-[#FF3B5C] mx-auto mb-1" />
              <p className="text-xs text-zinc-300 font-medium">Mutual Connection Established</p>
              <p className="text-[11px] text-zinc-500 mt-0.5">
                Both individuals expressed interest. Say something meaningful!
              </p>
            </div>

            {activeConv.messages.map((msg) => {
              const isMe = msg.senderId === 'me';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-md ${
                      isMe
                        ? 'bg-gradient-to-r from-[#FF3B5C] to-[#E01A4F] text-white rounded-br-xs'
                        : 'bg-white/[0.08] text-zinc-100 border border-white/10 rounded-bl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-[10px] text-zinc-500 px-1">
                    <span>{msg.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-[#FF3B5C]" />}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Text Input Form */}
          <form onSubmit={handleSend} className="p-4 border-t border-white/10 bg-[#121216] flex items-center gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeConv.participantName}...`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#FF3B5C]"
            />
            <Button
              type="submit"
              variant="glow"
              size="md"
              icon={<Send className="w-4 h-4" />}
            >
              Send
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8">
          <EmptyState
            icon={<MessageSquare className="w-8 h-8" />}
            title="Select a Conversation"
            description="Choose a conversation from the left to start reading or chatting."
          />
        </div>
      )}

    </div>
  );
};

