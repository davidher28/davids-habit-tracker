import { Habit } from './habit'

export interface HabitRepository {
  setHabits(habits: Habit[]): void
  save(habit: Habit): void
  findByName(name: string): Habit | undefined
  findByUserId(userId: string): Habit[]
  isExistingHabit(id: string): boolean
}

export const HabitRepository = Symbol('HabitRepository')
