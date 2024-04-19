import { InvalidChallengePartnerError } from './invalid-challenge.partner'

export class ChallengePartner {
  constructor(readonly partner: string) {
    if (partner.length > 300) {
      throw InvalidChallengePartnerError.withMessage(
        'The partner provided is greater than 300 characters.',
      )
    }
  }

  static create(partner: string): ChallengePartner {
    return new ChallengePartner(partner)
  }

  static empty(): ChallengePartner {
    return new ChallengePartner('')
  }
}
