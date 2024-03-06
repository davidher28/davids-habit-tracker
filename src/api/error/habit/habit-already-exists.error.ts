import { BaseError } from '../base-error'

export class HabitAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super('habit-already-exists', message)
  }

  static withName(name: string): HabitAlreadyExistsError {
    return new HabitAlreadyExistsError(
      `Habit with name ${name} already exists.`,
    )
  }
}
