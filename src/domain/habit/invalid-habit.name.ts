import { BaseError } from '../../api/error/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidHabitNameError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-habit-name', message)
  }

  static withMessage(message: string): InvalidHabitNameError {
    return new InvalidHabitNameError(message)
  }
}
