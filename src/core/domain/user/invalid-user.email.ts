import { BaseError } from '../../api/shared/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidUserEmailError extends BaseError {
  constructor(message: string) {
    super('invalid-user-email', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidUserEmailError {
    return new InvalidUserEmailError(message)
  }

  public static withEmail(email: string): InvalidUserEmailError {
    return new InvalidUserEmailError(
      `The email ${email} is not a valid address.`,
    )
  }
}
