import { BaseError } from '../../api/shared/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidHabitScheduleError extends BaseError {
  constructor(message: string) {
    super('invalid-habit-schedule', message, HttpStatus.BAD_REQUEST)
  }

  public static create(
    frequency: number,
    duration: number,
    restTime: number,
  ): InvalidHabitScheduleError {
    return new InvalidHabitScheduleError(
      `Invalid habit schedule configuration: frequency ${frequency}, duration ${duration} & rest time ${restTime}`,
    )
  }

  public static withMessage(message: string): InvalidHabitScheduleError {
    return new InvalidHabitScheduleError(message)
  }
}
