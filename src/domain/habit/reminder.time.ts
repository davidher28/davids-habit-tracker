import { InvalidReminderTimeError } from './invalid-reminder.time'

export class ReminderTime {
  readonly value: string

  constructor(value: string) {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/
    if (!timeRegex.test(value)) {
      throw InvalidReminderTimeError.withMessage(
        'Invalid time format. Time must be in 24-hour format (e.g., "12:00", "23:59").',
      )
    }

    this.value = value
  }

  static create(value: string): ReminderTime {
    return new ReminderTime(value)
  }
}
