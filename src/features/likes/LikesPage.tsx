import React from 'react';
import { useApp } from '../../store/appContext';
import { Heart, Sparkles, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { CompatibilityBadge } from '../../components/compatibility/CompatibilityBadge';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { useNavigate } from 'react-router-dom';

export const LikesPage: React.FC = () => {
  const { likesReceived, handleLikeBack, setSelectedCandidateForAnalysis } = useApp();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-wide">People Who Liked You</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FF3B5C]/20 border border-[#FF3B5C]/40 text-[#FF3B5C]">
              {likesReceived.length} Inbound Likes
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Members who expressed interest in your profile. Liking them back triggers an immediate mutual match.
          </p>
        </div>
      </div>

      {likesReceived.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {likesReceived.map((likeItem) => {
            const candidate = likeItem.candidate;

            return (
              <div
                key={likeItem.id}
                className="group relative rounded-3xl overflow-hidden bg-[#141418] border border-white/10 hover:border-[#FF3B5C]/40 transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                {/* Photo & Badges */}
                <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                  <img
                    src={candidate.photos[0]}
                    alt={candidate.firstName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30" />

                  {/* Top Badges */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                    <CompatibilityBadge score={candidate.compatibilityScore} size="sm" />
                    <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/10 text-[10px] text-zinc-300">
                      {likeItem.receivedAt}
                    </span>
                  </div>

                  {/* Name and distance */}
                  <div className="absolute bottom-3 inset-x-3">
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xl font-bold text-white">
                        {candidate.firstName}, {candidate.age}
                      </h3>
                      {candidate.verified && (
                        <CheckCircle2 className="w-4 h-4 text-[#FF3B5C] fill-[#FF3B5C]/20" />
                      )}
                    </div>
                    <p className="text-xs text-zinc-300">
                      {candidate.occupation} • {candidate.distanceKm} km away
                    </p>
                  </div>
                </div>

                {/* Card Content & Action */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-zinc-300 line-clamp-2 italic">
                    "{candidate.shortBio}"
                  </p>

                  <div className="flex flex-wrap gap-1">
                    {candidate.interests.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-full text-[10px] bg-white/5 border border-white/10 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="flex-1 text-xs"
                      onClick={() => setSelectedCandidateForAnalysis(candidate)}
                    >
                      Analysis
                    </Button>

                    <Button
                      variant="glow"
                      size="sm"
                      className="flex-1 text-xs"
                      icon={<Heart className="w-3.5 h-3.5 fill-white" />}
                      onClick={() => handleLikeBack(likeItem)}
                    >
                      Like Back
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={<Heart className="w-8 h-8" />}
          title="No New Likes Right Now"
          description="Keep your profile up to date and active. Your recommendations are regularly processed by the behavioral engine."
          actionLabel="Explore Discovery Deck"
          onAction={() => navigate('/discovery')}
          className="py-20"
        />
      )}
    </div>
  );
};

