import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'glass' | 'like' | 'pass' | 'star' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  label: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = 'glass',
  size = 'md',
  label,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center rounded-full transition-all duration-200 select-none active:scale-90 disabled:opacity-40 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-14 h-14 text-lg"
  };

  const variantStyles = {
    glass: "bg-[#141216]/80 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 hover:border-white/20 backdrop-blur-md shadow-lg",
    like: "bg-gradient-to-tr from-[#B3001B] via-[#8B0000] to-[#59000C] text-white shadow-[0_0_30px_rgba(179,0,27,0.7)] hover:shadow-[0_0_40px_rgba(211,18,42,0.9)] hover:scale-105 border border-white/25",
    pass: "bg-[#141216]/80 hover:bg-white/10 text-zinc-400 hover:text-white border border-white/10 hover:border-white/30 backdrop-blur-md shadow-lg hover:scale-105",
    star: "bg-[#141216]/80 hover:bg-white/10 text-zinc-300 hover:text-amber-400 border border-white/10 hover:border-amber-400/40 backdrop-blur-md shadow-lg hover:scale-105",
    ghost: "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white"
  };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
