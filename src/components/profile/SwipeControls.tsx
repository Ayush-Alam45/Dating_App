import React from 'react';
import { X, Heart, Star, Undo2 } from 'lucide-react';
import { IconButton } from '../ui/IconButton';

interface SwipeControlsProps {
  onPass: () => void;
  onLike: () => void;
  onSuperlike?: () => void;
  onUndo?: () => void;
  canUndo?: boolean;
  disabled?: boolean;
  className?: string;
}

export const SwipeControls: React.FC<SwipeControlsProps> = ({
  onPass,
  onLike,
  onSuperlike,
  onUndo,
  canUndo = false,
  disabled = false,
  className = ''
}) => {
  return (
    <div className={`flex items-center justify-center gap-4 sm:gap-6 py-4 ${className}`}>
      {/* Undo Button (Optional) */}
      {onUndo && (
        <IconButton
          variant="glass"
          size="md"
          label="Undo last action"
          onClick={onUndo}
          disabled={!canUndo || disabled}
          className="text-amber-400 hover:text-amber-300"
        >
          <Undo2 className="w-5 h-5" />
        </IconButton>
      )}

      {/* Pass Action (X) */}
      <IconButton
        variant="pass"
        size="lg"
        label="Pass candidate"
        onClick={onPass}
        disabled={disabled}
        className="w-14 h-14"
      >
        <X className="w-6 h-6 text-zinc-300" />
      </IconButton>

      {/* Primary Like Action (Heart) - glowing crimson circular button matching reference */}
      <IconButton
        variant="like"
        size="xl"
        label="Like candidate"
        onClick={onLike}
        disabled={disabled}
        className="w-16 h-16 shadow-[0_0_30px_rgba(255,59,92,0.6)]"
      >
        <Heart className="w-8 h-8 fill-white text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
      </IconButton>

      {/* Super Like / Save Action (Star) */}
      {onSuperlike && (
        <IconButton
          variant="star"
          size="lg"
          label="Super like candidate"
          onClick={onSuperlike}
          disabled={disabled}
          className="w-14 h-14"
        >
          <Star className="w-6 h-6 text-zinc-300 hover:text-amber-400" />
        </IconButton>
      )}
    </div>
  );
};

