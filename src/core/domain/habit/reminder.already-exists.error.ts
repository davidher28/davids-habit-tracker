import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../api/shared/base.error'

export class ReminderAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super('reminder-already-exists', message, HttpStatus.CONFLICT)
  }

  public static withMessage(message: string): ReminderAlreadyExistsError {
    return new ReminderAlreadyExistsError(message)
  }
}
