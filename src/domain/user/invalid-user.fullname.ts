import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidFullNameError extends BaseError {
  constructor(message: string) {
    super('invalid-fullname', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidFullNameError {
    return new InvalidFullNameError(message)
  }
}
