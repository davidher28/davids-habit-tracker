import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../../core/api/shared/base.error'

export class InvalidUUId extends BaseError {
  constructor(message: string) {
    super('invalid-uuid', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidUUId {
    return new InvalidUUId(message)
  }
}
