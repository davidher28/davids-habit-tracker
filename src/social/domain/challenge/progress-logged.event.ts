import { ChallengeId } from '../../../core/domain/challenge/challenge.id'
import { DomainEvent } from '../shared/domain.event'

export type ProgressLoggedPayload = {
  readonly challengeId: string
  readonly progress: number
  readonly date: Date
}

export class ProgressLoggedEvent extends DomainEvent<ProgressLoggedPayload> {
  static readonly TYPE = 'ProgressLogged'

  private constructor(
    challengeId: ChallengeId,
    payload: ProgressLoggedPayload,
  ) {
    super(challengeId, ProgressLoggedEvent.TYPE, payload)
  }

  static with(
    challengeId: ChallengeId,
    progress: number,
    date: Date,
  ): ProgressLoggedEvent {
    return new ProgressLoggedEvent(challengeId, {
      challengeId: challengeId.value,
      progress: progress,
      date: date,
    })
  }
}
