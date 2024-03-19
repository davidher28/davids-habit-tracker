import { InvalidHabitDescriptionError } from './invalid-habit.description'

export class HabitDescription {
  private constructor(readonly value: string) {
    if (!value || typeof value !== 'string' || value.length === 0) {
      throw InvalidHabitDescriptionError.withMessage(
        'Habit description must be a non-empty string.',
      )
    }

    this.value = value
  }

  public static create(value: string): HabitDescription {
    return new HabitDescription(value)
  }
}
