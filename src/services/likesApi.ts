import { LikeReceived } from '../types/match';
import { mockLikesReceived } from '../data/mockUsers';

export const likesApi = {
  async getReceivedLikes(): Promise<LikeReceived[]> {
    await new Promise((res) => setTimeout(res, 200));
    return [...mockLikesReceived];
  },

  async likeBack(likeId: string): Promise<{ success: boolean; isMutualMatch: boolean }> {
    await new Promise((res) => setTimeout(res, 250));
    return {
      success: true,
      isMutualMatch: true // Liking back an inbound admirer always results in a mutual match
    };
  }
};

