import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../api/base.error'

export class ReminderLimitError extends BaseError {
  constructor(message: string) {
    super('reminder-limit-reached', message, HttpStatus.CONFLICT)
  }

  public static withMessage(message: string): ReminderLimitError {
    return new ReminderLimitError(message)
  }
}
