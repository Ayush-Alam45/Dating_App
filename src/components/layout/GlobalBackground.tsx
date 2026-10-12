import React from 'react';

/**
 * GlobalBackground Component
 * Provides a permanent, consistent cinematic background across all routes
 * using the user-supplied background image (/bg.jpg) with a dark blood noir overlay.
 */
export const GlobalBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Permanent Background Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transform-gpu"
        style={{
          backgroundImage: "url('/bg.jpg')",
          backgroundPosition: 'center 20%'
        }}
      />

      {/* 2. Dark Translucent Overlays & Blood Red Radial Vignette for Readability */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 25%, rgba(139, 0, 0, 0.36) 0%, rgba(5, 5, 7, 0.84) 75%),
            linear-gradient(180deg, rgba(5, 5, 7, 0.68) 0%, rgba(5, 5, 7, 0.92) 100%)
          `
        }}
      />

      {/* 3. Subtle Ambient Blood Red Glows */}
      <div className="absolute top-1/4 -left-32 w-[520px] h-[520px] bg-[#8B0000]/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[520px] h-[520px] bg-[#660000]/25 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-[#4A0007]/15 rounded-full blur-[160px] pointer-events-none" />
    </div>
  );
};

