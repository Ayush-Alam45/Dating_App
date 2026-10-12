import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  linkTo?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', linkTo = '/' }) => {
  const sizeClasses = {
    sm: 'text-sm gap-2',
    md: 'text-base gap-2.5',
    lg: 'text-xl gap-3'
  };

  const starSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const content = (
    <div className={`flex items-center select-none font-medium tracking-[0.25em] text-white hover:text-white/95 transition-opacity ${sizeClasses[size]} ${className}`}>
      {/* 4-point custom star spark icon from reference */}
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${starSizes[size]} text-[#C41527] flex-shrink-0 animate-pulse-subtle drop-shadow-[0_0_8px_rgba(196,21,39,0.9)]`}
      >
        <path d="M12 0L14.4 9.6L24 12L14.4 14.4L12 24L9.6 14.4L0 12L9.6 9.6L12 0Z" />
      </svg>
      <span className="font-semibold uppercase tracking-[0.3em] bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/80">
        V É L O R A
      </span>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo} aria-label="VÉLORA Home">{content}</Link>;
  }

  return content;
};

