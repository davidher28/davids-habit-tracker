import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidUserEmailError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-user-email', message)
  }

  static withMessage(message: string): InvalidUserEmailError {
    return new InvalidUserEmailError(message)
  }

  static withEmail(email: string): InvalidUserEmailError {
    return new InvalidUserEmailError(
      `The email ${email} is not a valid address.`,
    )
  }
}
