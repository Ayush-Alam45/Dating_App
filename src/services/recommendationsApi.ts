import { CandidateProfile, SwipeActionType } from '../types/recommendation';
import { mockCandidates } from '../data/mockUsers';

// Future endpoints:
// GET /api/recommendations
// POST /api/likes
// POST /api/passes

export const recommendationsApi = {
  async getRecommendations(): Promise<CandidateProfile[]> {
    await new Promise((res) => setTimeout(res, 250));
    // In production, this will return candidates ranked by the deep learning behavioral model
    return [...mockCandidates];
  },

  async recordInteraction(
    candidateId: string,
    action: SwipeActionType
  ): Promise<{ success: boolean; isMutualMatch: boolean }> {
    await new Promise((res) => setTimeout(res, 200));

    // Simulation: Liking Aanya or Sofia creates a mutual match!
    const isMutualMatch = (action === 'like' || action === 'superlike') && (candidateId === 'cand_aanya' || candidateId === 'cand_sofia');

    return {
      success: true,
      isMutualMatch
    };
  }
};

