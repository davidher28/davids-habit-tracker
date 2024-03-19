import { BaseError } from '../../api/shared/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidHabitNameError extends BaseError {
  constructor(message: string) {
    super('invalid-habit-name', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidHabitNameError {
    return new InvalidHabitNameError(message)
  }
}
