import { BaseError } from '../../api/error/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidFullNameError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-fullname', message)
  }

  static withMessage(message: string): InvalidFullNameError {
    return new InvalidFullNameError(message)
  }
}
