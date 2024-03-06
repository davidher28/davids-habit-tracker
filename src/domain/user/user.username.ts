import { BadRequestException } from '@nestjs/common'

export class UserName {
  readonly value: string

  private constructor(value: string) {
    if (!value || typeof value !== 'string' || value.trim() === '') {
      throw new BadRequestException('User name must be a non-empty string')
    }

    this.value = value
  }

  static create(value: string): UserName {
    return new UserName(value)
  }
}
