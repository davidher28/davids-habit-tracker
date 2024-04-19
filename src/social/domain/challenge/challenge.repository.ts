import { Challenge } from './challenge'
import { ChallengeId } from './challenge-id'

export interface ChallengeRepository {
  setChallenges(challenges: Challenge[]): void
  save(challenge: Challenge): void
  findById(id: ChallengeId): Challenge | undefined
}

export const ChallengeRepository = Symbol('ChallengeRepository')
