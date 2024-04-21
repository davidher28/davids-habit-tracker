import { DomainEvent } from '../shared/domain.event'
import { ChallengeId } from './challenge.id'

export type UsersAddedPayload = {
  readonly challengeId: string
  readonly users: string[]
}

export class UsersAddedEvent extends DomainEvent<UsersAddedPayload> {
  public static readonly TYPE = 'UsersAdded'

  private constructor(challengeId: ChallengeId, payload: UsersAddedPayload) {
    super(challengeId, UsersAddedEvent.TYPE, payload)
  }

  static with(challengeId: ChallengeId, users: string[]) {
    return new UsersAddedEvent(challengeId, {
      challengeId: challengeId.value,
      users,
    })
  }
}
