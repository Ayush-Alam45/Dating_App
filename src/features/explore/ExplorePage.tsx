import React, { useState } from 'react';
import { useApp } from '../../store/appContext';
import { 
  Sparkles, Compass, CheckCircle2, ArrowRight, Heart, Filter, SlidersHorizontal 
} from 'lucide-react';
import { CompatibilityBadge } from '../../components/compatibility/CompatibilityBadge';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const ExplorePage: React.FC = () => {
  const { candidates, handleLike, setSelectedCandidateForAnalysis } = useApp();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Top Predicted', 'Creative Souls', 'Tech & Vision', 'Thoughtful Writers'];

  const filteredCandidates = candidates.filter(c => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Top Predicted') return c.compatibilityScore >= 90;
    if (selectedCategory === 'Creative Souls') return c.interests.some(i => ['Art', 'Design', 'Music'].includes(i));
    if (selectedCategory === 'Tech & Vision') return c.interests.some(i => ['Tech', 'Gaming'].includes(i));
    if (selectedCategory === 'Thoughtful Writers') return c.interests.some(i => ['Writing', 'Books', 'Philosophy'].includes(i));
    return true;
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-white tracking-wide">Explore Gallery</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#FF3B5C]/20 border border-[#FF3B5C]/40 text-[#FF3B5C]">
              AI Curated
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1">
            Browse through profiles organized by behavioral resonance and lifestyle clusters.
          </p>
        </div>

        <Button
          variant="glow"
          size="md"
          icon={<Compass className="w-4 h-4" />}
          onClick={() => navigate('/discovery')}
        >
          Return to Swipe Deck
        </Button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-medium border whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#FF3B5C] border-[#FF3B5C] text-white shadow-[0_0_15px_rgba(255,59,92,0.4)]'
                : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Candidate Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="group relative rounded-3xl overflow-hidden bg-[#141418] border border-white/10 hover:border-[#FF3B5C]/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
              <img
                src={candidate.photos[0]}
                alt={candidate.firstName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141418] via-transparent to-black/30" />

              <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                <CompatibilityBadge score={candidate.compatibilityScore} size="sm" />
                {candidate.badge && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FF3B5C]/80 text-white text-[10px] font-bold">
                    {candidate.badge}
                  </span>
                )}
              </div>

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
                  {candidate.occupation} • {candidate.location}
                </p>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-xs text-zinc-400 line-clamp-2">
                {candidate.shortBio}
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
                  variant="primary"
                  size="sm"
                  className="flex-1 text-xs"
                  icon={<Heart className="w-3.5 h-3.5 fill-white" />}
                  onClick={() => handleLike(candidate.id)}
                >
                  Like
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

