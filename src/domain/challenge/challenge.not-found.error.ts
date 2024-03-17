import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../api/base.error'

export class ChallengeNotFoundError extends BaseError {
  constructor(message: string) {
    super('challenge-not-found', message, HttpStatus.NOT_FOUND)
  }

  public static withId(challengeId: string): ChallengeNotFoundError {
    return new ChallengeNotFoundError(
      `Challenge with id ${challengeId} does not exist.`,
    )
  }
}
