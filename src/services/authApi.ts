import { UserProfile } from '../types/user';
import { mockCurrentUser } from '../data/mockUsers';

// Future endpoints:
// POST /api/auth/register
// POST /api/auth/send-otp
// POST /api/auth/verify-otp
// POST /api/auth/logout

export const authApi = {
  async register(contactType: 'email' | 'phone', contactValue: string): Promise<{ success: boolean; message: string }> {
    // Simulated API response delay
    await new Promise((res) => setTimeout(res, 400));
    return {
      success: true,
      message: `Verification code sent to ${contactValue}`
    };
  },

  async verifyOtp(otp: string): Promise<{ success: boolean; user?: Partial<UserProfile>; token?: string }> {
    await new Promise((res) => setTimeout(res, 400));
    // Development simulated mock OTP logic: accept standard '123456' or any 6 digits
    if (otp.length === 6) {
      return {
        success: true,
        token: 'mock_jwt_token_velora_preview'
      };
    }
    throw new Error('Invalid OTP code. Please enter the 6-digit verification code.');
  },

  async getCurrentUser(): Promise<UserProfile | null> {
    await new Promise((res) => setTimeout(res, 200));
    return mockCurrentUser;
  },

  async logout(): Promise<void> {
    await new Promise((res) => setTimeout(res, 200));
  }
};

