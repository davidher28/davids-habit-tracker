import { HabitId } from './habit.id'
import { ReminderId } from './reminder.id'

export class Reminder {
  readonly id: ReminderId
  readonly habitId: HabitId
  readonly message: string
  readonly state: string
  readonly time: string

  constructor(
    id: ReminderId,
    habitId: HabitId,
    message: string,
    state: string,
    time: string,
  ) {
    this.id = id
    this.habitId = habitId
    this.message = message
    this.state = state
    this.time = time
  }

  static create(
    id: ReminderId,
    habitId: HabitId,
    message: string,
    state: string,
    time: string,
  ): Reminder {
    return new Reminder(id, habitId, message, state, time)
  }

  get habitIdValue(): string {
    return this.habitId.value
  }
}
