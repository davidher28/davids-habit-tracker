import { Challenge } from './challenge'
import { HabitId } from './habit.id'

export interface ChallengeRepository {
  save(challenge: Challenge): void
  findByHabitId(habitId: HabitId): Challenge[]
}

export const ChallengeRepository = Symbol('ChallengeRepository')
