import { BaseError } from '../shared/base.error'

export class HabitNotFoundError extends BaseError {
  constructor(message: string) {
    super('habit-not-found', message)
  }

  static withId(habitId: string): HabitNotFoundError {
    return new HabitNotFoundError(`Habit with id ${habitId} does not exist.`)
  }
}
