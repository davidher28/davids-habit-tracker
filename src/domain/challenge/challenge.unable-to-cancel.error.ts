import { BaseError } from '../../api/base.error'
import { HttpStatus } from '@nestjs/common'

export class ChallengeUnableToCancelError extends BaseError {
  constructor(message: string) {
    super('unable-to-cancel-challenge', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): ChallengeUnableToCancelError {
    return new ChallengeUnableToCancelError(message)
  }
}
