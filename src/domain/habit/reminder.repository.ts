import { Reminder } from './reminder'
import { HabitId } from './habit.id'

export interface ReminderRepository {
  save(reminder: Reminder): void
  findByHabitId(habitId: HabitId): Reminder[]
}

export const ReminderRepository = Symbol('ReminderRepository')
