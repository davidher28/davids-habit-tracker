import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../api/base.error'

export class ReminderLimitError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, 'reminder-limit-reached', message)
  }

  static withMessage(message: string): ReminderLimitError {
    return new ReminderLimitError(message)
  }
}
