import { HabitId } from './habit.id'
import { ReminderId } from './reminder.id'
import { UUId } from '../shared/uuid'

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
    habitId: string,
    message: string,
    state: string,
    time: string,
  ): Reminder {
    const uuid = UUId.generate()
    const reminderId = ReminderId.create(uuid)

    return new Reminder(
      reminderId,
      HabitId.create(habitId),
      message,
      state,
      time,
    )
  }

  get habitIdValue(): string {
    return this.habitId.value
  }
}
