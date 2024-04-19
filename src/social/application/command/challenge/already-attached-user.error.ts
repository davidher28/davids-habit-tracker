import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../../api/shared/base.error'

export class AlreadyAttachedUserError extends BaseError {
  constructor(message: string) {
    super('already-attached-user', message, HttpStatus.NOT_FOUND)
  }

  public static withMessage(message: string): AlreadyAttachedUserError {
    return new AlreadyAttachedUserError(message)
  }
}
