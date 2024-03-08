import { BaseError } from '../../api/error/base.error'

export class InvalidHabitNameError extends BaseError {
  constructor(message: string) {
    super('invalid-habit-name', message)
  }

  static withMessage(message: string): InvalidHabitNameError {
    return new InvalidHabitNameError(message)
  }
}
