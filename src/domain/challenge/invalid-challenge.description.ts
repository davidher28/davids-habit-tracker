import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidChallengeDescriptionError extends BaseError {
  constructor(message: string) {
    super('invalid-challenge-description', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidChallengeDescriptionError {
    return new InvalidChallengeDescriptionError(message)
  }
}
