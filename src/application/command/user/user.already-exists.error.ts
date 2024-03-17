import { BaseError } from '../../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class UserAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super('user-already-exists', message, HttpStatus.CONFLICT)
  }

  public static withUserName(userName: string): UserAlreadyExistsError {
    return new UserAlreadyExistsError(
      `User with username ${userName} already exists.`,
    )
  }
}
