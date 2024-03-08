import { InvalidProgressDateError } from './invalid-progress.date'

export class ProgressDate {
  readonly value: Date

  constructor(value: Date) {
    if (value > new Date()) {
      throw InvalidProgressDateError.withMessage(
        'Progress date cannot be in the future.',
      )
    }

    this.value = value
  }

  static create(date: Date): ProgressDate {
    return new ProgressDate(date)
  }
}
