import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidProgressDateError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-progress-date', message)
  }

  static withMessage(message: string): InvalidProgressDateError {
    return new InvalidProgressDateError(message)
  }
}
