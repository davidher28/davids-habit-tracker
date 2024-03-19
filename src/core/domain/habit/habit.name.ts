import { InvalidHabitNameError } from './invalid-habit.name'

export class HabitName {
  private constructor(readonly value: string) {
    if (!value || typeof value !== 'string' || value.length < 3) {
      throw InvalidHabitNameError.withMessage(
        'Habit name must be a non-empty string.',
      )
    }

    this.value = value
  }

  public static create(value: string): HabitName {
    return new HabitName(value)
  }

  public equals(name: HabitName): boolean {
    return this.value === name.value
  }
}
