import { Habit } from '../../../core/domain/habit/habit'
import { HabitId } from '../../../core/domain/habit/habit.id'
import { HabitName } from '../../../core/domain/habit/habit.name'
import { UserId } from '../../../core/domain/user/user.id'

export interface HabitRepository {
  setHabits(habits: Habit[]): void
  save(habit: Habit): void
  findById(id: HabitId): Habit | undefined
  findByName(name: HabitName): Habit | undefined
  findByUserId(userId: UserId): Habit[]
  isExistingHabit(id: HabitId): boolean
}

export const HabitRepository = Symbol('HabitRepository')
