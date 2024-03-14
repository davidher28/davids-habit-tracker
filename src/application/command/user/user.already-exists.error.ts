import { BaseError } from '../../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class UserAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, 'user-already-exists', message)
  }

  static withUserName(userName: string): UserAlreadyExistsError {
    return new UserAlreadyExistsError(
      `User with username ${userName} already exists.`,
    )
  }
}
