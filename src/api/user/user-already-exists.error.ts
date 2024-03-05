import { BaseError } from '../error'

export class UserAlreadyExistsError extends BaseError {
  constructor(userName: string) {
    super(
      'user-already-exists',
      `User with username ${userName} already exists.`,
    )
  }
}
