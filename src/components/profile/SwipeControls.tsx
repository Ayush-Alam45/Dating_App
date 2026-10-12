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
    <div className={`flex items-center justify-center gap-4 sm:gap-6 py-1.5 sm:py-2 flex-shrink-0 ${className}`}>
      {/* Undo Button (Optional) */}
      {onUndo && (
        <IconButton
          variant="glass"
          size="sm"
          label="Undo last action"
          onClick={onUndo}
          disabled={!canUndo || disabled}
          className="w-10 h-10 text-amber-400 hover:text-amber-300"
        >
          <Undo2 className="w-4 h-4" />
        </IconButton>
      )}

      {/* Pass Action (X) */}
      <IconButton
        variant="pass"
        size="md"
        label="Pass candidate"
        onClick={onPass}
        disabled={disabled}
        className="w-11 h-11 sm:w-12 sm:h-12"
      >
        <X className="w-5 h-5 text-zinc-300" />
      </IconButton>

      {/* Primary Like Action (Heart) - glowing dark blood red circular button */}
      <IconButton
        variant="like"
        size="lg"
        label="Like candidate"
        onClick={onLike}
        disabled={disabled}
        className="w-14 h-14 sm:w-15 sm:h-15 shadow-[0_0_25px_rgba(179,0,27,0.7)] hover:shadow-[0_0_35px_rgba(211,18,42,0.9)]"
      >
        <Heart className="w-7 h-7 fill-white text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]" />
      </IconButton>

      {/* Super Like / Save Action (Star) */}
      {onSuperlike && (
        <IconButton
          variant="star"
          size="md"
          label="Super like candidate"
          onClick={onSuperlike}
          disabled={disabled}
          className="w-11 h-11 sm:w-12 sm:h-12"
        >
          <Star className="w-5 h-5 text-zinc-300 hover:text-amber-400" />
        </IconButton>
      )}
    </div>
  );
};
