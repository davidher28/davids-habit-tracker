import { InvalidChallengeDescriptionError } from './invalid-challenge.description'

export class ChallengeDescription {
  private constructor(readonly value: string) {
    if (!value || typeof value !== 'string' || value.length === 0) {
      throw InvalidChallengeDescriptionError.withMessage(
        'Challenge description must be a non-empty string.',
      )
    }

    if (value.length > 30) {
      throw InvalidChallengeDescriptionError.withMessage(
        'Challenge description must be less than 30 characters.',
      )
    }

    this.value = value
  }

  public static create(value: string): ChallengeDescription {
    return new ChallengeDescription(value)
  }
}
