import { BaseError } from '../../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class HabitAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super('habit-already-exists', message, HttpStatus.CONFLICT)
  }

  public static withName(name: string): HabitAlreadyExistsError {
    return new HabitAlreadyExistsError(
      `Habit with name ${name} already exists.`,
    )
  }
}
