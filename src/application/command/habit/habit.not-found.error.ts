import { BaseError } from '../../../api/error/base.error'
import { HttpStatus } from '@nestjs/common'

export class HabitNotFoundError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, 'habit-not-found', message)
  }

  static withId(habitId: string): HabitNotFoundError {
    return new HabitNotFoundError(`Habit with id ${habitId} does not exist.`)
  }
}
