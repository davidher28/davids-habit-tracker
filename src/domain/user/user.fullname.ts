import { InvalidFullNameError } from './invalid-user.fullname'

export class UserFullName {
  private constructor(readonly value: string) {
    if (!String(value).trim()) {
      throw InvalidFullNameError.withMessage(
        'Full name must be a non-empty string.',
      )
    }

    this.value = value
  }

  public static create(value: string): UserFullName {
    return new UserFullName(value)
  }
}
