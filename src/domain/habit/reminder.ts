import { HabitId } from './habit.id'
import { ReminderId } from './reminder.id'
import { UUId } from '../shared/uuid'
import { ReminderTime } from './reminder.time'

export enum ReminderStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export class Reminder {
  private constructor(
    readonly id: ReminderId,
    readonly habitId: HabitId,
    readonly message: string,
    readonly status: ReminderStatus,
    readonly time: ReminderTime,
  ) {
    this.id = id
    this.habitId = habitId
    this.message = message
    this.status = status
    this.time = time
  }

  static create(
    habitId: string,
    message: string,
    status: ReminderStatus,
    time: string,
  ): Reminder {
    const uuid = UUId.generate()
    const reminderId = ReminderId.create(uuid)

    return new Reminder(
      reminderId,
      HabitId.create(habitId),
      message,
      status,
      ReminderTime.create(time),
    )
  }

  get timeValue(): string {
    return this.time.value
  }
}
