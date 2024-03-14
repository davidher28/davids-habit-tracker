import { BaseError } from '../../api/error/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidUUId extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-uuid', message)
  }

  static withMessage(message: string): InvalidUUId {
    return new InvalidUUId(message)
  }
}
