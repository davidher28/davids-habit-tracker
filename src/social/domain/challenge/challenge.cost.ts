import { InvalidChallengeCostError } from './invalid-challenge.cost'

export class ChallengeCost {
  constructor(readonly cost: number) {
    if (cost < 0) {
      throw InvalidChallengeCostError.withMessage(
        'The cost provided is less than 0.',
      )
    }
  }

  static create(cost: number): ChallengeCost {
    return new ChallengeCost(cost)
  }

  static empty(): ChallengeCost {
    return new ChallengeCost(0)
  }
}
