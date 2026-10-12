import { Match } from '../types/match';
import { initialMockMatches } from '../data/mockMatches';

// Future endpoints:
// GET /api/matches

export const matchesApi = {
  async getMatches(): Promise<Match[]> {
    await new Promise((res) => setTimeout(res, 200));
    return [...initialMockMatches];
  }
};

