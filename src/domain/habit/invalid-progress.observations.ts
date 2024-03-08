import { BaseError } from '../../api/error/base.error'

export class InvalidProgressObservationsError extends BaseError {
  constructor(message: string) {
    super('invalid-progress-observations', message)
  }

  static withMessage(message: string): InvalidProgressObservationsError {
    return new InvalidProgressObservationsError(message)
  }
}
