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
      className={`relative w-full rounded-3xl overflow-hidden bg-[#141216]/90 border border-white/15 shadow-[0_15px_50px_rgba(0,0,0,0.9)] hover:border-[#8B0000]/60 transition-all duration-300 select-none group ${className}`}
    >
      {/* Photo carousel container */}
      <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] overflow-hidden bg-black/60">
        <img
          src={currentPhoto}
          alt={`${candidate.firstName}`}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80";
          }}
        />

        {/* Ambient dark blood vignette lighting overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a080c] via-black/30 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-[#0a080c] via-[#0a080c]/85 to-transparent pointer-events-none" />

        {/* Top Badges Row */}
        <div className="absolute top-4 inset-x-4 flex items-center justify-between z-20 pointer-events-auto">
          {candidate.badge ? (
            <Badge variant="red" dot className="bg-[#8B0000]/60 border-[#C41527] text-white font-semibold tracking-wide shadow-[0_0_12px_rgba(196,21,39,0.5)]">
              {candidate.badge}
            </Badge>
          ) : (
            <div />
          )}

          {/* Photo indicator (e.g. 1/3) */}
          <div className="px-2.5 py-1 rounded-full bg-black/60 border border-white/15 text-[11px] font-medium text-zinc-300 backdrop-blur-md">
            {photoIndex + 1} / {candidate.photos.length}
          </div>
        </div>

        {/* Photo navigation tap zones */}
        {candidate.photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevPhoto}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextPhoto}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 backdrop-blur-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Story/Progress bars on top */}
        {candidate.photos.length > 1 && (
          <div className="absolute top-2 inset-x-4 flex gap-1.5 z-20">
            {candidate.photos.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                  i === photoIndex ? 'bg-white shadow-[0_0_8px_white]' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Card Info Content Overlay */}
      <div className="absolute bottom-0 inset-x-0 p-5 z-20 pointer-events-auto">
        {/* AI Predicted Compatibility Badge */}
        <div className="mb-2.5">
          <CompatibilityBadge score={candidate.compatibilityScore} size="sm" />
        </div>

        {/* Candidate Name & Age */}
        <div className="flex items-center gap-2 mb-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>{candidate.firstName}, {candidate.age}</span>
            {candidate.verified && (
              <span title="100% Verified Profile">
                <CheckCircle2 className="w-5 h-5 text-[#C41527] fill-[#C41527]/20" />
              </span>
            )}
          </h2>
        </div>

        {/* Occupation & Distance */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 mb-2.5 flex-wrap">
          <span className="flex items-center gap-1">
            <Briefcase className="w-3.5 h-3.5 text-zinc-400" />
            {candidate.occupation}
          </span>
          <span className="text-zinc-500">•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-400" />
            {candidate.distanceKm} km away
          </span>
        </div>

        {/* Short Bio */}
        <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 mb-3 leading-relaxed">
          {candidate.shortBio}
        </p>

        {/* Interests Pills */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {candidate.interests.slice(0, 4).map((interest) => (
            <span
              key={interest}
              className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-zinc-200 border border-white/10 backdrop-blur-md"
            >
              {interest}
            </span>
          ))}
          {candidate.interests.length > 4 && (
            <span className="px-2 py-0.5 rounded-full text-xs text-zinc-400 bg-white/5">
              +{candidate.interests.length - 4}
            </span>
          )}
        </div>

        {/* View Compatibility Analysis CTA */}
        {onViewAnalysis && (
          <button
            type="button"
            onClick={onViewAnalysis}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-[#8B0000]/30 border border-white/10 hover:border-[#C41527]/50 text-xs font-medium text-zinc-200 hover:text-white transition-all backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C41527]" />
            <span>View Compatibility Analysis</span>
            <Eye className="w-3.5 h-3.5 text-zinc-400 ml-auto" />
          </button>
        )}
      </div>
    </div>
  );
};
