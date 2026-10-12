import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 select-none active:scale-95 disabled:opacity-50 disabled:pointer-events-none";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3 text-base gap-2.5"
  };

  const variantStyles = {
    primary: "bg-[#8B0000] hover:bg-[#A30000] text-white shadow-[0_4px_20px_rgba(139,0,0,0.5)] hover:shadow-[0_6px_28px_rgba(196,21,39,0.7)] border border-[#C41527]/50",
    glow: "bg-gradient-to-r from-[#B3001B] via-[#8B0000] to-[#59000C] text-white shadow-[0_0_25px_rgba(179,0,27,0.55)] hover:shadow-[0_0_35px_rgba(211,18,42,0.85)] border border-white/20",
    secondary: "bg-white/[0.07] hover:bg-white/[0.12] text-white border border-white/10 hover:border-white/20 backdrop-blur-md",
    outline: "bg-transparent hover:bg-[#8B0000]/15 text-white border border-white/20 hover:border-[#C41527]",
    ghost: "bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white"
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
      )}
      {!isLoading && icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
    </button>
  );
};
