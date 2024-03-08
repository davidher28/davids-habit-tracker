import { Habit } from './habit'
import { HabitName } from './habit.name'
import { UserId } from '../user/user.id'
import { HabitId } from './habit.id'

export interface HabitRepository {
  setHabits(habits: Habit[]): void
  save(habit: Habit): void
  findByName(name: HabitName): Habit | undefined
  findByUserId(userId: UserId): Habit[]
  isExistingHabit(id: HabitId): boolean
}

export const HabitRepository = Symbol('HabitRepository')
