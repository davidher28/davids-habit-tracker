import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidReminderTimeError extends BaseError {
  constructor(message: string) {
    super('invalid-reminder-time', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidReminderTimeError {
    return new InvalidReminderTimeError(message)
  }
}
