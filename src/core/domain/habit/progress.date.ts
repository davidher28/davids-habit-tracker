import { InvalidProgressDateError } from './invalid-progress.date'

export class ProgressDate {
  private constructor(readonly value: Date) {
    if (value > new Date()) {
      throw InvalidProgressDateError.withMessage(
        'Progress date cannot be in the future.',
      )
    }

    this.value = value
  }

  public static create(date: Date): ProgressDate {
    return new ProgressDate(date)
  }
}
