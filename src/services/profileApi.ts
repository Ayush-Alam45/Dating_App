import { UserProfile } from '../types/user';
import { mockCurrentUser } from '../data/mockUsers';

// Future endpoints:
// GET /api/profile/me
// PUT /api/profile/me

export const profileApi = {
  async getProfile(): Promise<UserProfile> {
    await new Promise((res) => setTimeout(res, 200));
    return mockCurrentUser;
  },

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((res) => setTimeout(res, 300));
    return {
      ...mockCurrentUser,
      ...updates
    };
  }
};

