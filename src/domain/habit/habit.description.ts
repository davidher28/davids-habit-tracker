import { BadRequestException } from '@nestjs/common'

export class HabitDescription {
  readonly value: string

  private constructor(value: string) {
    if (!value || typeof value !== 'string' || value.length > 500) {
      throw new BadRequestException('Invalid habit description')
    }

    this.value = value
  }

  static create(value: string): HabitDescription {
    return new HabitDescription(value)
  }
}
