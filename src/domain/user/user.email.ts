import { InvalidUserEmailError } from './invalid-user.email'

export class UserEmail {
  private constructor(readonly value: string) {
    if (!String(value).trim()) {
      throw InvalidUserEmailError.withMessage(
        'Email must be a non-empty string.',
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      throw InvalidUserEmailError.withEmail(value)
    }

    this.value = value
  }

  public static create(value: string): UserEmail {
    return new UserEmail(value)
  }
}
