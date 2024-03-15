import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidReminderTimeError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-reminder-time', message)
  }

  static withMessage(message: string): InvalidReminderTimeError {
    return new InvalidReminderTimeError(message)
  }
}
