import { BaseError } from '../../core/api/shared/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidIdError extends BaseError {
  private constructor(message: string) {
    super('invalid-id', message, HttpStatus.BAD_REQUEST)
  }

  static withInvalidValue(id: string): InvalidIdError {
    return new InvalidIdError(`Invalid id: ${id}`)
  }
}
