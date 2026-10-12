import React from 'react';

/**
 * GlobalBackground Component
 * Provides a permanent, consistent cinematic background across all routes
 * using second.png blended seamlessly into the dark theme.
 */
export const GlobalBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen -z-10 pointer-events-none overflow-hidden select-none"
    >
      {/* 1. Background Image — second.png */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/second.png')",
          backgroundPosition: 'center center',
        }}
      />

      {/* 2. Deep dark overlay so the image blends into the dark UI */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(5, 5, 7, 0.78) 0%,
              rgba(5, 5, 7, 0.55) 40%,
              rgba(5, 5, 7, 0.55) 60%,
              rgba(5, 5, 7, 0.88) 100%
            )
          `
        }}
      />

      {/* 3. Left-edge fade so left sidebar merges into the image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            linear-gradient(90deg,
              rgba(5, 5, 7, 0.92) 0%,
              rgba(5, 5, 7, 0.30) 30%,
              rgba(5, 5, 7, 0.10) 60%,
              rgba(5, 5, 7, 0.50) 100%
            )
          `
        }}
      />

      {/* 4. Blood-red radial vignette — brand accent blended into image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 60% 45%,
              rgba(139, 0, 0, 0.22) 0%,
              transparent 70%
            )
          `
        }}
      />

      {/* 5. Ambient edge glows for depth */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#050507]/70 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#050507]/60 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-[#8B0000]/12 rounded-full blur-[130px] pointer-events-none" />
    </div>
  );
};
