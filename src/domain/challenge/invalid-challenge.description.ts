import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class InvalidChallengeDescriptionError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'invalid-challenge-description', message)
  }

  static withMessage(message: string): InvalidChallengeDescriptionError {
    return new InvalidChallengeDescriptionError(message)
  }
}
