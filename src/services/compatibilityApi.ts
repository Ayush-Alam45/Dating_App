import { CompatibilityAnalysis } from '../types/recommendation';
import { mockCandidates } from '../data/mockUsers';

// Future endpoint contract:
// GET /api/compatibility/:candidateId
// Connects to the Deep Learning behavioral model pipeline

export const compatibilityApi = {
  async getCompatibilityAnalysis(candidateId: string): Promise<CompatibilityAnalysis | null> {
    await new Promise((res) => setTimeout(res, 200));
    const candidate = mockCandidates.find((c) => c.id === candidateId);
    if (!candidate) return null;
    return candidate.compatibilityAnalysis;
  }
};

