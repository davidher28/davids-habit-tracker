import { BadRequestException } from '@nestjs/common'

export enum Frequency {
  HOUR = 'HOUR',
  DAY = 'DAY',
  WEEK = 'WEEK',
}

export class HabitFrequency {
  private readonly value: Frequency

  constructor(value: Frequency) {
    if (!HabitFrequency.isValidFrequency(value)) {
      throw new BadRequestException('Invalid frequency value')
    }
    this.value = value
  }

  static create(value: Frequency): HabitFrequency {
    return new HabitFrequency(value)
  }

  getValue(): Frequency {
    return this.value
  }

  static isValidFrequency(value: Frequency): boolean {
    return [Frequency.HOUR, Frequency.DAY, Frequency.WEEK].includes(value)
  }
}
