import { BadRequestException } from '@nestjs/common'

export class HabitName {
  readonly value: string

  private constructor(value: string) {
    if (!value || typeof value !== 'string' || value.length < 3) {
      throw new BadRequestException('Habit name must be a non-empty string.')
    }

    this.value = value
  }

  static create(value: string): HabitName {
    return new HabitName(value)
  }
}
