import { InvalidHabitScheduleError } from './invalid-habit.schedule'

export enum Frequency {
  HOURLY = 'HOURLY',
  DAILY = 'DAILY',
  WEEKLY = 'WEEKLY',
}

export namespace Frequency {
  export const toSeconds = {
    [Frequency.HOURLY]: 3600,
    [Frequency.DAILY]: 86400,
    [Frequency.WEEKLY]: 604800,
  }
  export function isValidFrequency(value: string): boolean {
    return [Frequency.HOURLY, Frequency.DAILY, Frequency.WEEKLY].includes(
      value as Frequency,
    )
  }
}

export class HabitSchedule {
  private constructor(
    readonly frequency: Frequency,
    readonly duration: number,
    readonly restTime: number,
  ) {
    if (!Frequency.isValidFrequency(frequency)) {
      throw InvalidHabitScheduleError.withMessage(
        'Habit frequency must be a valid frequency. Please, use HOURLY, DAILY or WEEKLY.',
      )
    }

    if (duration + restTime > Frequency.toSeconds[frequency]) {
      throw InvalidHabitScheduleError.create(
        Frequency.toSeconds[frequency],
        duration,
        restTime,
      )
    }
  }

  public static create(
    frequency: Frequency,
    duration: number,
    restTime: number,
  ): HabitSchedule {
    return new HabitSchedule(frequency, duration, restTime)
  }
}
