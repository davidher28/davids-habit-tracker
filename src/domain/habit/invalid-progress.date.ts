import { BaseError } from '../../api/error/base.error'

export class InvalidProgressDateError extends BaseError {
  constructor(message: string) {
    super('invalid-progress-date', message)
  }

  static withMessage(message: string): InvalidProgressDateError {
    return new InvalidProgressDateError(message)
  }
}
