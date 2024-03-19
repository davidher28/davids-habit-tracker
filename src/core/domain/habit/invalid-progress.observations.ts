import { BaseError } from '../../api/shared/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidProgressObservationsError extends BaseError {
  constructor(message: string) {
    super('invalid-progress-observations', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidProgressObservationsError {
    return new InvalidProgressObservationsError(message)
  }
}
