import { BaseError } from '../base-error'

export class UserNotFoundError extends BaseError {
  constructor(message: string) {
    super('user-not-found', message)
  }

  static withId(userId: string): UserNotFoundError {
    return new UserNotFoundError(`User with id ${userId} does not exists.`)
  }
}
