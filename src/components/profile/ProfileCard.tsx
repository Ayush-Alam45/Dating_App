import React, { useState } from 'react';
import { CandidateProfile } from '../../types/recommendation';
import { Badge } from '../ui/Badge';
import { CompatibilityBadge } from '../compatibility/CompatibilityBadge';
import { CheckCircle2, ChevronLeft, ChevronRight, MapPin, Sparkles, Briefcase, Eye } from 'lucide-react';

interface ProfileCardProps {
  candidate: CandidateProfile;
  onViewAnalysis?: () => void;
  className?: string;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  candidate,
  onViewAnalysis,
  className = ''
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev + 1) % candidate.photos.length);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIndex((prev) => (prev - 1 + candidate.photos.length) % candidate.photos.length);
  };

  const currentPhoto = candidate.photos[photoIndex] || candidate.photos[0];

  return (
    <div
      className={`relative w-full max-w-[500px] lg:max-w-[540px] h-[min(540px,calc(100dvh-200px))] min-h-[380px] max-h-[560px] rounded-[24px] overflow-hidden bg-[#141216]/95 border border-white/15 shadow-[0_15px_45px_rgba(0,0,0,0.85)] hover:border-[#8B0000]/60 transition-all duration-300 select-none group flex flex-col justify-end ${className}`}
    >
      {/* 1. Portrait Photo (Occupies entirety of card with object-cover) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-black/60">
        <img
          src={currentPhoto}
          alt={`${candidate.firstName}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Ambient Dark Blood Noir Vignette & Legibility Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-[#080809]/80 to-transparent pointer-events-none" />

        {/* Top Badges Row */}
        <div className="absolute top-3 inset-x-3.5 flex items-center justify-between z-20 pointer-events-auto">
          {candidate.badge ? (
            <Badge variant="red" dot className="bg-[#8B0000]/70 border-[#C41527] text-white text-[11px] font-semibold tracking-wide shadow-[0_0_12px_rgba(196,21,39,0.5)]">
              {candidate.badge}
            </Badge>
          ) : (
            <div />
          )}

          {/* Photo indicator (e.g. 1/3) */}
          <div className="px-2.5 py-0.5 rounded-full bg-black/60 border border-white/15 text-[11px] font-medium text-zinc-300 backdrop-blur-md">
            {photoIndex + 1} / {candidate.photos.length}
          </div>
        </div>

        {/* Photo navigation tap arrows */}
        {candidate.photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevPhoto}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/75 text-white/80 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/40 hover:bg-black/75 text-white/80 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Story/Progress bars on top */}
        {candidate.photos.length > 1 && (
          <div className="absolute top-2 inset-x-3.5 flex gap-1 z-20">
            {candidate.photos.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i === photoIndex ? 'bg-white shadow-[0_0_6px_white]' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* 2. Candidate Information Overlay (Placed over readable bottom gradient) */}
      <div className="relative z-20 p-3.5 sm:p-4.5 pointer-events-auto space-y-1.5 bg-gradient-to-t from-[#080809] via-[#080809]/90 to-transparent pt-8">
        
        {/* AI Predicted Compatibility Badge */}
        <div className="mb-1">
          <CompatibilityBadge score={candidate.compatibilityScore} size="sm" />
        </div>

        {/* Candidate Name & Age */}
        <div className="flex items-center gap-1.5">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-1.5">
            <span>{candidate.firstName}, {candidate.age}</span>
            {candidate.verified && (
              <span title="100% Verified Profile">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#C41527] fill-[#C41527]/20" />
              </span>
            )}
          </h2>
        </div>

        {/* Occupation & Distance */}
        <div className="flex items-center gap-2 text-xs text-zinc-300 flex-wrap">
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3 text-zinc-400" />
            {candidate.occupation}
          </span>
          <span className="text-zinc-500">•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-zinc-400" />
            {candidate.distanceKm} km away
          </span>
        </div>

        {/* Short Bio (Clamped to 1-2 lines to strictly prevent overflow) */}
        <p className="text-xs text-zinc-300 line-clamp-1 sm:line-clamp-2 leading-relaxed">
          {candidate.shortBio}
        </p>

        {/* Interests Pills (Compact first 3-4 pills) */}
        <div className="flex flex-wrap gap-1 pt-0.5">
          {candidate.interests.slice(0, 4).map((interest) => (
            <span
              key={interest}
              className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-white/10 text-zinc-200 border border-white/10 backdrop-blur-md"
            >
              {interest}
            </span>
          ))}
          {candidate.interests.length > 4 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] text-zinc-400 bg-white/5">
              +{candidate.interests.length - 4}
            </span>
          )}
        </div>

        {/* View Compatibility Analysis CTA */}
        {onViewAnalysis && (
          <button
            type="button"
            onClick={onViewAnalysis}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-white/[0.05] hover:bg-[#8B0000]/30 border border-white/10 hover:border-[#C41527]/50 text-xs font-medium text-zinc-200 hover:text-white transition-all backdrop-blur-md"
          >
            <Sparkles className="w-3 h-3 text-[#C41527]" />
            <span>View Compatibility Analysis</span>
            <Eye className="w-3 h-3 text-zinc-400 ml-auto" />
          </button>
        )}
      </div>
    </div>
  );
};
