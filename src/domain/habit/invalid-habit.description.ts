import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidHabitDescriptionError extends BaseError {
  constructor(message: string) {
    super('invalid-habit-description', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidHabitDescriptionError {
    return new InvalidHabitDescriptionError(message)
  }
}
