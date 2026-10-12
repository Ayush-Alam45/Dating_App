export type RelationshipStatus = 'single' | 'married' | 'divorced' | 'widowed';

export type Gender = 'woman' | 'man' | 'non-binary' | 'prefer-not-to-say';

export type GenderPreference = 'men' | 'women' | 'everyone';

export interface UserPreferences {
  genderPreferences: GenderPreference[];
  ageRange: [number, number];
  distanceKm: number;
  relationshipGoals: string[];
}

export interface UserProfile {
  id: string;
  email?: string;
  phone?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: Gender;
  relationshipStatus: RelationshipStatus;
  occupation?: string;
  education?: string;
  location?: string;
  bio?: string;
  interests: string[];
  photos: string[];
  partnerPreferences: UserPreferences;
  isProfileComplete: boolean;
  createdAt: string;
}

export interface AuthSession {
  user: UserProfile | null;
  isAuthenticated: boolean;
  registrationStep: 'unregistered' | 'otp-pending' | 'profile-pending' | 'completed';
  pendingContact?: {
    type: 'email' | 'phone';
    value: string;
  };
}

