import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidUUId extends BaseError {
  constructor(message: string) {
    super('invalid-uuid', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidUUId {
    return new InvalidUUId(message)
  }
}
