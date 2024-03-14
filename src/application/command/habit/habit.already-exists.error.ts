import { BaseError } from '../../../api/error/base.error'
import { HttpStatus } from '@nestjs/common'

export class HabitAlreadyExistsError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.CONFLICT, 'habit-already-exists', message)
  }

  static withName(name: string): HabitAlreadyExistsError {
    return new HabitAlreadyExistsError(
      `Habit with name ${name} already exists.`,
    )
  }
}
