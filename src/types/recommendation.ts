export interface CompatibilityFactor {
  id: string;
  category: string;
  label: string;
  score: number; // 0 - 100
  description: string;
  highAlignmentReason?: string;
}

export interface CompatibilityAnalysis {
  overallScore: number;
  confidenceBand: 'High' | 'Moderate' | 'Exploratory';
  summary: string;
  disclaimer: string;
  factors: CompatibilityFactor[];
  sharedValues: string[];
  communicationCompatibility: string;
}

export interface CandidateProfile {
  id: string;
  firstName: string;
  lastName?: string;
  age: number;
  gender: string;
  occupation: string;
  education?: string;
  location: string;
  distanceKm: number;
  verified: boolean;
  shortBio: string;
  photos: string[];
  interests: string[];
  compatibilityScore: number; // Placeholder predicted score from future AI model
  explanationFactors: CompatibilityFactor[];
  compatibilityAnalysis: CompatibilityAnalysis;
  badge?: 'Top Pick' | 'New' | 'High Compatibility' | 'Trending';
}

export type SwipeDirection = 'left' | 'right' | 'up';
export type SwipeActionType = 'like' | 'pass' | 'superlike';

