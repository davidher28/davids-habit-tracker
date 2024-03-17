import { InvalidUserNameError } from './invalid-user.username'

export class UserName {
  private constructor(readonly value: string) {
    if (!String(value).trim()) {
      throw InvalidUserNameError.withMessage(
        'User name must be a non-empty string.',
      )
    }

    this.value = value
  }

  public static create(value: string): UserName {
    return new UserName(value)
  }

  public equals(userName: UserName): boolean {
    return this.value === userName.value
  }
}
