import { InvalidUserNameError } from './invalid-user.username'

export class UserName {
  readonly value: string

  private constructor(value: string) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw InvalidUserNameError.withMessage(
        'User name must be a non-empty string.',
      )
    }

    this.value = value
  }

  static create(value: string): UserName {
    return new UserName(value)
  }

  equals(userName: UserName): boolean {
    return this.value === userName.value
  }
}
