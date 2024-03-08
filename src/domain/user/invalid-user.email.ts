import { BaseError } from '../../api/error/base.error'

export class InvalidUserEmailError extends BaseError {
  constructor(message: string) {
    super('invalid-user-email', message)
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
