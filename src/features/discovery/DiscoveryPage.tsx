import React, { useState } from 'react';
import { useApp } from '../../store/appContext';
import { ProfileCard } from '../../components/profile/ProfileCard';
import { SwipeControls } from '../../components/profile/SwipeControls';
import { EmptyState } from '../../components/ui/EmptyState';
import { 
  Sparkles, RotateCcw, BrainCircuit, SlidersHorizontal 
} from 'lucide-react';

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
    <div className="max-w-xl mx-auto py-2 sm:py-4 flex flex-col justify-center min-h-[calc(100vh-6.5rem)] select-none">
      
      {/* Top Header Controls: Clean & Focused (No marketing banners) */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-[#C41527]" />
          <h1 className="text-base font-bold text-white tracking-wide">Compatibility Swap Deck</h1>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#8B0000]/30 border border-[#C41527]/50 text-[#C41527]">
            AI Ranked
          </span>
        </div>

        <button
          type="button"
          onClick={resetDeck}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-zinc-300 hover:text-white transition-all active:scale-95"
          title="Reset Candidates Deck"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Deck</span>
        </button>
      </div>

      {/* Central Tinder-inspired Swipe/Swap Option */}
      {currentCandidate ? (
        <div className="w-full flex flex-col items-center">
          {/* Animated Swiping Card */}
          <div
            className={`w-full transition-all duration-300 transform ${
              swipeAnimation === 'like'
                ? 'translate-x-36 rotate-8 opacity-0 scale-95'
                : swipeAnimation === 'pass'
                ? '-translate-x-36 -rotate-8 opacity-0 scale-95'
                : 'translate-x-0 rotate-0 opacity-100 scale-100'
            }`}
          >
            <ProfileCard
              candidate={currentCandidate}
              onViewAnalysis={() => setSelectedCandidateForAnalysis(currentCandidate)}
            />
          </div>

          {/* Swipe Controls Below Card (Pass, Like with Dark Blood Glow, Superlike) */}
          <div className="w-full pt-1">
            <SwipeControls
              onPass={onPassClick}
              onLike={onLikeClick}
              onSuperlike={onSuperlikeClick}
              disabled={!!swipeAnimation}
            />
          </div>
        </div>
      ) : (
        <div className="py-12">
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
