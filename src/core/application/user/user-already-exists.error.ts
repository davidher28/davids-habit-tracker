import { BaseError } from '../../error'

export class UserAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('user-already-exists', message)
  }

  static withUsername(username: string) {
    return new UserAlreadyExistsError(
      `User with username ${username} already exists`,
    )
  }
}
