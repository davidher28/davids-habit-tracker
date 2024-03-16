import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../api/base.error'

export class ChallengeNotFoundError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.NOT_FOUND, 'challenge-not-found', message)
  }

  static withId(challengeId: string): ChallengeNotFoundError {
    return new ChallengeNotFoundError(
      `Challenge with id ${challengeId} does not exist.`,
    )
  }
}
