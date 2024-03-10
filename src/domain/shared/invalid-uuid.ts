import { BaseError } from '../../api/error/base.error'

export class InvalidUUId extends BaseError {
  constructor(message: string) {
    super('invalid-uuid', message)
  }

  static withMessage(message: string): InvalidUUId {
    return new InvalidUUId(message)
  }
}
