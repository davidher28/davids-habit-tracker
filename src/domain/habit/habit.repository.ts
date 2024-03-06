import { Habit } from './habit'

export interface HabitRepository {
  setHabits(habits: Habit[]): void
  save(habit: Habit): void
  findByName(name: string): Habit | undefined
}

export const HabitRepository = Symbol('HabitRepository')
