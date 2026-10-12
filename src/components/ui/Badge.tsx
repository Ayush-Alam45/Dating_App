import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'red' | 'glass' | 'emerald' | 'amber';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'glass',
  dot = false,
  className = ''
}) => {
  const variantStyles = {
    glass: 'bg-white/10 text-white/90 border-white/15',
    red: 'bg-[#8B0000]/25 text-[#C41527] border-[#C41527]/50',
    emerald: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    amber: 'bg-amber-500/15 text-amber-300 border-amber-500/30'
  };

  const dotColors = {
    glass: 'bg-white',
    red: 'bg-[#C41527]',
    emerald: 'bg-emerald-400',
    amber: 'bg-amber-400'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border backdrop-blur-md ${variantStyles[variant]} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`} />}
      {children}
    </span>
  );
};
