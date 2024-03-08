import { BaseError } from '../../api/error/base.error'

export class InvalidUserNameError extends BaseError {
  constructor(message: string) {
    super('invalid-username', message)
  }

  static withMessage(message: string): InvalidUserNameError {
    return new InvalidUserNameError(message)
  }
}
