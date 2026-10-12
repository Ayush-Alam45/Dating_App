import React, { useState } from 'react';
import { useApp } from '../../store/appContext';
import { ProfileCard } from '../../components/profile/ProfileCard';
import { SwipeControls } from '../../components/profile/SwipeControls';
import { EmptyState } from '../../components/ui/EmptyState';
import { Sparkles, RotateCcw, BrainCircuit } from 'lucide-react';

export const DiscoveryPage: React.FC = () => {
  const { 
    currentCandidate, 
    handleLike, 
    handlePass, 
    handleSuperlike, 
    resetDeck,
    setSelectedCandidateForAnalysis
  } = useApp();

  const [swipeAnimation, setSwipeAnimation] = useState<'like' | 'pass' | null>(null);

  const onLikeClick = async () => {
    if (!currentCandidate) return;
    setSwipeAnimation('like');
    setTimeout(async () => {
      await handleLike(currentCandidate.id);
      setSwipeAnimation(null);
    }, 250);
  };

  const onPassClick = async () => {
    if (!currentCandidate) return;
    setSwipeAnimation('pass');
    setTimeout(async () => {
      await handlePass(currentCandidate.id);
      setSwipeAnimation(null);
    }, 250);
  };

  const onSuperlikeClick = async () => {
    if (!currentCandidate) return;
    await handleSuperlike(currentCandidate.id);
  };

  return (
    <div className="w-full max-w-[540px] mx-auto flex-1 flex flex-col justify-between py-1 select-none h-full min-h-0">
      
      {/* 1. Top Header Controls: Compact & Fixed within single viewport */}
      <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-white/[0.08] flex-shrink-0">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-[#C41527]" />
          <h1 className="text-sm sm:text-base font-bold text-white tracking-wide">Compatibility Swap Deck</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8B0000]/30 border border-[#C41527]/50 text-[#C41527]">
            AI Ranked
          </span>
        </div>

        <button
          type="button"
          onClick={resetDeck}
          className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-zinc-300 hover:text-white transition-all active:scale-95"
          title="Reset Candidates Deck"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Deck</span>
        </button>
      </div>

      {/* 2. Central Tinder-inspired Swipe/Swap Option (Fits on screen without vertical scrolling) */}
      {currentCandidate ? (
        <div className="w-full flex-1 min-h-0 flex flex-col items-center justify-center">
          {/* Animated Swiping Card */}
          <div
            className={`w-full flex items-center justify-center transition-all duration-300 transform ${
              swipeAnimation === 'like'
                ? 'translate-x-32 rotate-6 opacity-0 scale-95'
                : swipeAnimation === 'pass'
                ? '-translate-x-32 -rotate-6 opacity-0 scale-95'
                : 'translate-x-0 rotate-0 opacity-100 scale-100'
            }`}
          >
            <ProfileCard
              candidate={currentCandidate}
              onViewAnalysis={() => setSelectedCandidateForAnalysis(currentCandidate)}
            />
          </div>

          {/* Swipe Controls Below Card (Pass, Like, Superlike) */}
          <div className="w-full flex-shrink-0">
            <SwipeControls
              onPass={onPassClick}
              onLike={onLikeClick}
              onSuperlike={onSuperlikeClick}
              disabled={!!swipeAnimation}
            />
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center py-6">
          <EmptyState
            icon={<Sparkles className="w-8 h-8 text-[#C41527]" />}
            title="All Candidates Reviewed"
            description="You have swiped through all available candidates in this session. Reset the deck to discover more matches ranked by the deep learning model."
            actionLabel="Reset Discovery Deck"
            onAction={resetDeck}
          />
        </div>
      )}

    </div>
  );
};
