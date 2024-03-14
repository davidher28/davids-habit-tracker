import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidHabitDescriptionError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-habit-description', message)
  }

  static withMessage(message: string): InvalidHabitDescriptionError {
    return new InvalidHabitDescriptionError(message)
  }
}
