import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../api/shared/base.error'

export class InvalidChallengePartnerError extends BaseError {
  constructor(message: string) {
    super('invalid-challenge-partner', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidChallengePartnerError {
    return new InvalidChallengePartnerError(message)
  }
}
