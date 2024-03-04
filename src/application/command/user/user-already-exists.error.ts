import { BaseError } from '../../../api/error'

export class UserAlreadyExistsError extends BaseError {
  private constructor(message: string) {
    super('user-already-exists', message)
  }

  static withUsername(userName: string) {
    return new UserAlreadyExistsError(
      `User with username ${userName} already exists`,
    )
  }
}
