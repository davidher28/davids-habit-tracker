import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../api/base.error'

export class ReminderAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, 'reminder-already-exists', message)
  }

  static withMessage(message: string): ReminderAlreadyExistsError {
    return new ReminderAlreadyExistsError(message)
  }
}
