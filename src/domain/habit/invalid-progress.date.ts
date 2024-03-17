import { BaseError } from '../../api/shared/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidProgressDateError extends BaseError {
  constructor(message: string) {
    super('invalid-progress-date', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidProgressDateError {
    return new InvalidProgressDateError(message)
  }
}
