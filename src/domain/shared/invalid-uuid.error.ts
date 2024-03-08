import { BaseError } from '../../api/error/base.error'

export class InvalidUUIdError extends BaseError {
  constructor(message: string) {
    super('invalid-uuid', message)
  }

  static withMessage(message: string): InvalidUUIdError {
    return new InvalidUUIdError(message)
  }
}
