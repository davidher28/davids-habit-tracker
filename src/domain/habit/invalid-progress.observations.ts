import { BaseError } from '../../api/error/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidProgressObservationsError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-progress-observations', message)
  }

  static withMessage(message: string): InvalidProgressObservationsError {
    return new InvalidProgressObservationsError(message)
  }
}
