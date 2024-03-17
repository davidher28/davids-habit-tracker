import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class ChallengeUnableToCancelError extends BaseError {
  constructor(message: string) {
    super(HttpStatus.BAD_REQUEST, 'unable-to-cancel-challenge', message)
  }

  static withMessage(message: string): ChallengeUnableToCancelError {
    return new ChallengeUnableToCancelError(message)
  }
}
