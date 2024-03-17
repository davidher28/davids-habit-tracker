import { Challenge } from './challenge'
import { HabitId } from '../habit/habit.id'
import { ChallengeId } from './challenge.id'

export interface ChallengeRepository {
  setChallenges(challenges: Challenge[]): void
  save(challenge: Challenge): void
  findById(id: ChallengeId): Challenge | undefined
  findByHabitId(habitId: HabitId): Challenge[]
  findPendingByHabitId(habitId: HabitId): Challenge[]
}

export const ChallengeRepository = Symbol('ChallengeRepository')
