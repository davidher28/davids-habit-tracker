const validStatus = ['PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED']

export class ChallengeStatus {
  constructor(readonly value: string) {}

  static create(value: string): ChallengeStatus {
    if (!validStatus.includes(value)) {
      throw new Error(`Invalid challenge status: ${value}`)
    }

    return new ChallengeStatus(value)
  }

  static empty(): ChallengeStatus {
    return new ChallengeStatus('')
  }

  static started(): ChallengeStatus {
    return new ChallengeStatus('STARTED')
  }

  static pending(): ChallengeStatus {
    return new ChallengeStatus('PENDING')
  }

  static completed(): ChallengeStatus {
    return new ChallengeStatus('COMPLETED')
  }

  isPending() {
    return this.value === 'PENDING'
  }
}
