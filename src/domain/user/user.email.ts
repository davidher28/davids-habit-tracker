import { BadRequestException } from '@nestjs/common'

export class UserEmail {
  readonly value: string

  private constructor(value: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!value || typeof value !== 'string' || !emailRegex.test(value)) {
      throw new BadRequestException('Invalid email address')
    }

    this.value = value
  }

  static create(value: string): UserEmail {
    return new UserEmail(value)
  }
}
