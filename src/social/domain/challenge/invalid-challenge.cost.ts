import { HttpStatus } from '@nestjs/common'
import { BaseError } from '../../api/shared/base.error'

export class InvalidChallengeCostError extends BaseError {
  constructor(message: string) {
    super('invalid-challenge-cost', message, HttpStatus.BAD_REQUEST)
  }

  public static withMessage(message: string): InvalidChallengeCostError {
    return new InvalidChallengeCostError(message)
  }
}
