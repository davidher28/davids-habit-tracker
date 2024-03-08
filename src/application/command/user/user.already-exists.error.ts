import { BaseError } from '../../../api/error/base.error'

export class UserAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super('user-already-exists', message)
  }

  static withUserName(userName: string): UserAlreadyExistsError {
    return new UserAlreadyExistsError(
      `User with username ${userName} already exists.`,
    )
  }
}
