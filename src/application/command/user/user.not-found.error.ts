import { BaseError } from '../../../api/error/base.error'
import { HttpStatus } from '@nestjs/common'

export class UserNotFoundError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, 'user-not-found', message)
  }

  static withId(userId: string): UserNotFoundError {
    return new UserNotFoundError(`User with id ${userId} does not exist.`)
  }
}
