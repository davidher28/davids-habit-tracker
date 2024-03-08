import { InvalidProgressObservationsError } from './invalid-progress.observations'

export class ProgressObservations {
  readonly value: string

  constructor(value: string) {
    if (value && value.length < 10) {
      throw InvalidProgressObservationsError.withMessage(
        'Observations must be at least 10 characters long.',
      )
    }

    if (value && value.length > 200) {
      throw InvalidProgressObservationsError.withMessage(
        'Observations cannot exceed 200 characters.',
      )
    }

    this.value = value
  }

  static create(value: string): ProgressObservations {
    return new ProgressObservations(value)
  }
}
