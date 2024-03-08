import { Progress } from './progress'
import { HabitId } from './habit.id'

export interface ProgressRepository {
  save(progress: Progress): void
  findByHabitId(habitId: HabitId): Progress[]
}

export const ProgressRepository = Symbol('ProgressRepository')
