import { BaseError } from '../../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class UserNotFoundError extends BaseError {
  constructor(message: string) {
    super('user-not-found', message, HttpStatus.NOT_FOUND)
  }

  public static withId(userId: string): UserNotFoundError {
    return new UserNotFoundError(`User with id ${userId} does not exist.`)
  }
}
