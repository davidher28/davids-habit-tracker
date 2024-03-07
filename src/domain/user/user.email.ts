import { BadRequestException } from '@nestjs/common'

export class UserEmail {
  readonly value: string

  private constructor(value: string) {
    if (!value || value.length === 0) {
      throw new BadRequestException('Email must be a non-empty string.')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
      throw new BadRequestException(
        'The email provided is not a valid address.',
      )
    }

    this.value = value
  }

  static create(value: string): UserEmail {
    return new UserEmail(value)
  }
}
