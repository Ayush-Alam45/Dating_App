import React from 'react';
import { Modal } from '../ui/Modal';
import { CandidateProfile } from '../../types/recommendation';
import { CompatibilityExplanation } from '../compatibility/CompatibilityExplanation';
import { Sparkles, BrainCircuit, ShieldAlert, HeartHandshake } from 'lucide-react';
import { Button } from '../ui/Button';

interface CompatibilityAnalysisModalProps {
  candidate: CandidateProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onLike?: () => void;
}

export const CompatibilityAnalysisModal: React.FC<CompatibilityAnalysisModalProps> = ({
  candidate,
  isOpen,
  onClose,
  onLike
}) => {
  if (!candidate) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Deep Behavioral Compatibility Analysis" maxWidth="xl">
      <div className="space-y-6">
        {/* Header Summary */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#FF3B5C]/15 to-transparent border border-[#FF3B5C]/20">
          <img
            src={candidate.photos[0]}
            alt={candidate.firstName}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#FF3B5C]/60 shadow-[0_0_15px_rgba(255,59,92,0.4)]"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-lg font-semibold text-white">{candidate.firstName}, {candidate.age}</h4>
              <span className="px-2 py-0.5 text-xs rounded-full bg-[#FF3B5C] text-white font-bold">
                {candidate.compatibilityScore}% Predicted Match
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">{candidate.occupation} • {candidate.location}</p>
          </div>
        </div>

        {/* AI Model Summary */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 text-[#FF3B5C]" />
            <span>Behavioral Framework Summary</span>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {candidate.compatibilityAnalysis.summary}
          </p>
        </div>

        {/* Factor Breakdown */}
        <div>
          <h5 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-3">
            Predicted Alignment Vectors
          </h5>
          <CompatibilityExplanation factors={candidate.compatibilityAnalysis.factors} />
        </div>

        {/* Shared Values */}
        <div>
          <h5 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
            Shared Resonance Values
          </h5>
          <div className="flex flex-wrap gap-2">
            {candidate.compatibilityAnalysis.sharedValues.map((val) => (
              <span
                key={val}
                className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-200"
              >
                {val}
              </span>
            ))}
          </div>
        </div>

        {/* Scientific / Academic Project Disclaimer (Section 8 requirement) */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-200/90 leading-relaxed">
          <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
          <p>
            {candidate.compatibilityAnalysis.disclaimer} As part of our deep learning research project, these indicators reflect estimated behavioral resonance models based on profile interaction patterns and value vectors.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-white/10">
          <Button variant="secondary" size="md" onClick={onClose}>
            Close
          </Button>
          {onLike && (
            <Button
              variant="primary"
              size="md"
              icon={<HeartHandshake className="w-4 h-4" />}
              onClick={() => {
                onLike();
                onClose();
              }}
            >
              Like {candidate.firstName}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

