import React from 'react';
import { CompatibilityFactor } from '../../types/recommendation';

interface CompatibilityExplanationProps {
  factors: CompatibilityFactor[];
  compact?: boolean;
}

export const CompatibilityExplanation: React.FC<CompatibilityExplanationProps> = ({
  factors,
  compact = false
}) => {
  return (
    <div className="space-y-3">
      {factors.map((factor) => (
        <div key={factor.id} className="p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-zinc-200">{factor.label}</span>
            <span className="text-xs font-semibold text-[#FF3B5C]">{factor.score}%</span>
          </div>

          {/* Meter bar */}
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#8F102B] to-[#FF3B5C] rounded-full transition-all duration-500"
              style={{ width: `${factor.score}%` }}
            />
          </div>

          {!compact && (
            <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
              {factor.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

