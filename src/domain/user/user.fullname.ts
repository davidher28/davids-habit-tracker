import { InvalidFullNameError } from './invalid-user.fullname'

export class UserFullName {
  readonly value: string

  private constructor(value: string) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw InvalidFullNameError.withMessage(
        'Full name must be a non-empty string.',
      )
    }

    this.value = value
  }

  static create(value: string): UserFullName {
    return new UserFullName(value)
  }
}
