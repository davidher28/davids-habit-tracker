import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidUserNameError extends BaseError {
  constructor(message: string) {
    super('invalid-username', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidUserNameError {
    return new InvalidUserNameError(message)
  }
}
