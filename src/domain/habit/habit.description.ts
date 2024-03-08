import { InvalidHabitDescriptionError } from './invalid-habit.description'

export class HabitDescription {
  readonly value: string

  private constructor(value: string) {
    if (!value || typeof value !== 'string' || value.length === 0) {
      throw InvalidHabitDescriptionError.withMessage(
        'Habit description must be a non-empty string.',
      )
    }

    this.value = value
  }

  static create(value: string): HabitDescription {
    return new HabitDescription(value)
  }
}
