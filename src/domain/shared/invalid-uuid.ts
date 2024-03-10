import { BaseError } from '../../api/error/base.error'

export class InvalidUuid extends BaseError {
  constructor(message: string) {
    super('invalid-uuid', message)
  }

  static withMessage(message: string): InvalidUuid {
    return new InvalidUuid(message)
  }
}
