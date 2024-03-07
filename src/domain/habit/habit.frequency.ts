import { BadRequestException } from '@nestjs/common'

export enum Frequency {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
}

export class HabitFrequency {
  readonly value: string

  constructor(value: string) {
    if (!HabitFrequency.isValidFrequency(value as Frequency)) {
      throw new BadRequestException(
        'Habit frequency must be a valid frequency. Please, use HOURLY, DAILY or WEEKLY.',
      )
    }
    this.value = value
  }

  static create(value: string): HabitFrequency {
    return new HabitFrequency(value)
  }

  static isValidFrequency(value: Frequency): boolean {
    return [Frequency.HOURLY, Frequency.DAILY, Frequency.WEEKLY].includes(value)
  }
}
