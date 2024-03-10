import { Reminder } from '../../domain/habit/reminder'
import { ReminderRepository } from '../../domain/habit/reminder.repository'
import { HabitId } from '../../domain'

export class InMemoryReminderRepository implements ReminderRepository {
  private reminders: Reminder[] = []

  save(reminder: Reminder): void {
    this.reminders.push(reminder)
  }

  findByHabitId(habitId: HabitId): Reminder[] {
    return this.reminders.filter((reminder) => reminder.habitId.equals(habitId))
  }
}
