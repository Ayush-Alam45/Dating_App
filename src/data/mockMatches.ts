import { Match } from '../types/match';
import { mockCandidates } from './mockUsers';

export const initialMockMatches: Match[] = [
  {
    id: 'match_riya',
    candidateId: 'cand_riya',
    candidate: mockCandidates[1],
    matchedAt: '3 hours ago',
    compatibilityScore: 88,
    lastInteraction: "That's so cool!",
    unreadCount: 0
  },
  {
    id: 'match_sofia',
    candidateId: 'cand_sofia',
    candidate: mockCandidates[3],
    matchedAt: '1 day ago',
    compatibilityScore: 91,
    lastInteraction: 'Matched yesterday',
    unreadCount: 0
  }
];

