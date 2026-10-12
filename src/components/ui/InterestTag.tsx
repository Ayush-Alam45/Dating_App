import React from 'react';
import { 
  Music, Plane, Laptop, Camera, Gamepad2, Film, 
  BookOpen, Utensils, Palette, Trees, Dumbbell, Sparkles, X
} from 'lucide-react';

interface InterestTagProps {
  label: string;
  selected?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
  size?: 'sm' | 'md';
}

const getIconForInterest = (label: string) => {
  const normalized = label.toLowerCase();
  if (normalized.includes('music')) return <Music className="w-3 h-3 text-zinc-400" />;
  if (normalized.includes('travel')) return <Plane className="w-3 h-3 text-zinc-400" />;
  if (normalized.includes('tech')) return <Laptop className="w-3 h-3 text-zinc-400" />;
  if (normalized.includes('photo')) return <Camera className="w-3 h-3 text-zinc-400" />;
  if (normalized.includes('game') || normalized.includes('gaming')) return <Gamepad2 className="w-3 h-3 text-zinc-400" />;
  if (normalized.includes('movie') || normalized.includes('cinema')) return <Film className="w-3 h-3 text-zinc-400" />;
  if (normalized.includes('book') || normalized.includes('reading')) return <BookOpen className="w-3 h-3 text-zinc-400" />;
  if (normalized.includes('food') || normalized.includes('culinary')) return <Utensils className="w-3 h-3 text-zinc-400" />;
  if (normalized.includes('art') || normalized.includes('design')) return <Palette className="w-3 h-3 text-zinc-400" />;
  if (normalized.includes('nature')) return <Trees className="w-3 h-3 text-zinc-400" />;
  if (normalized.includes('fit') || normalized.includes('run')) return <Dumbbell className="w-3 h-3 text-zinc-400" />;
  return <Sparkles className="w-3 h-3 text-zinc-400" />;
};

export const InterestTag: React.FC<InterestTagProps> = ({
  label,
  selected = false,
  onToggle,
  onRemove,
  size = 'md'
}) => {
  const sizeClasses = size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs';

  return (
    <span
      onClick={onToggle}
      className={`inline-flex items-center gap-1.5 rounded-full transition-all duration-200 border select-none ${sizeClasses} ${
        selected
          ? 'bg-[#FF3B5C]/20 border-[#FF3B5C]/60 text-white font-medium shadow-[0_0_12px_rgba(255,59,92,0.3)]'
          : 'bg-[#18181c]/70 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white'
      } ${onToggle ? 'cursor-pointer hover:border-white/25 active:scale-95' : ''}`}
    >
      {getIconForInterest(label)}
      <span>{label}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:text-[#FF3B5C] transition-colors"
          aria-label={`Remove ${label}`}
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </span>
  );
};

