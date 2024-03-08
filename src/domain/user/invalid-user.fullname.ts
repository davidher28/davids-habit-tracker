import { BaseError } from '../../api/error/base.error'

export class InvalidFullNameError extends BaseError {
  constructor(message: string) {
    super('invalid-fullname', message)
  }

  static withMessage(message: string): InvalidFullNameError {
    return new InvalidFullNameError(message)
  }
}
