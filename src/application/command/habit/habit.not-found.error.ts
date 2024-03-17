import { BaseError } from '../../../api/shared/base.error'
import { HttpStatus } from '@nestjs/common'

export class HabitNotFoundError extends BaseError {
  constructor(message: string) {
    super('habit-not-found', message, HttpStatus.NOT_FOUND)
  }

  public static withId(habitId: string): HabitNotFoundError {
    return new HabitNotFoundError(`Habit with id ${habitId} does not exist.`)
  }
}
