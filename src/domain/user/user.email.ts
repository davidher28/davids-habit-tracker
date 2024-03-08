import { InvalidUserEmailError } from './invalid-user.email'

export class UserEmail {
  readonly value: string

  private constructor(value: string) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
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

  static create(value: string): UserEmail {
    return new UserEmail(value)
  }
}
