import { BaseError } from '../../api/error/base.error'

export class InvalidHabitDescriptionError extends BaseError {
  constructor(message: string) {
    super('invalid-habit-description', message)
  }

  static withMessage(message: string): InvalidHabitDescriptionError {
    return new InvalidHabitDescriptionError(message)
  }
}
