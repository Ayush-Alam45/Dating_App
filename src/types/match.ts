import { CandidateProfile } from './recommendation';

export interface Match {
  id: string;
  candidateId: string;
  candidate: CandidateProfile;
  matchedAt: string;
  compatibilityScore: number;
  lastInteraction?: string;
  unreadCount?: number;
}

export interface LikeReceived {
  id: string;
  candidate: CandidateProfile;
  receivedAt: string;
  isMutual: boolean;
}

