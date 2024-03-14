import { BaseError } from '../../api/error/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidHabitScheduleError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-habit-schedule', message)
  }

  static create(
    frequency: number,
    duration: number,
    restTime: number,
  ): InvalidHabitScheduleError {
    return new InvalidHabitScheduleError(
      `Invalid habit schedule configuration: frequency ${frequency}, duration ${duration} & rest time ${restTime}`,
    )
  }

  static withMessage(message: string): InvalidHabitScheduleError {
    return new InvalidHabitScheduleError(message)
  }
}
