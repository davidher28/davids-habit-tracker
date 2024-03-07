import { Habit } from './habit'

export interface HabitRepository {
  setHabits(habits: Habit[]): void
  save(habit: Habit): void
  findById(id: string): Habit | undefined
  findByName(name: string): Habit | undefined
  findByUserId(userId: string): Habit[]
}

export const HabitRepository = Symbol('HabitRepository')
