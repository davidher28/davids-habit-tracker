import { BaseError } from '../../api/error/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidUserNameError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-username', message)
  }

  static withMessage(message: string): InvalidUserNameError {
    return new InvalidUserNameError(message)
  }
}
