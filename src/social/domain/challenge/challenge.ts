import { EventSourcedEntity } from '../shared/event-sourced.entity'
import { ChallengeStartedEvent } from './challenge-started.event'
import { ChallengeState } from './challenge-state'
import { ProgressLoggedEvent } from './progress-logged.event'
import { HabitId } from '../habit/habit.id'
import { DomainEvent } from '../shared/domain.event'
import { ChallengeId } from './challenge-id'
import { UsersAddedEvent } from './users-added.event'

export class Challenge extends EventSourcedEntity {
  private challengeState: ChallengeState

  private constructor(stream: Array<DomainEvent> = []) {
    super(stream)
    if (stream.length === 0) {
      this.challengeState = ChallengeState.empty()
    }
  }

  protected when(e: DomainEvent): void {
    const eventHandlers: { [key: string]: (event: DomainEvent) => void } = {
      [ChallengeStartedEvent.TYPE]: (event) =>
        this.whenChallengeStarted(event as ChallengeStartedEvent),
      [ProgressLoggedEvent.TYPE]: (event) =>
        this.whenProgressLogged(event as ProgressLoggedEvent),
      [UsersAddedEvent.TYPE]: (event) =>
        this.whenUsersAdded(event as UsersAddedEvent),
    }

    const handler = eventHandlers[e.type]
    if (!handler) {
      throw new Error('Unknown event type')
    }

    handler(e)
  }

  private whenChallengeStarted(event: ChallengeStartedEvent) {
    this.challengeState = this.challengeState.withChallengeStarted(event)
  }

  private whenProgressLogged(event: ProgressLoggedEvent) {
    this.challengeState = this.challengeState.withProgressLogged(event)
  }

  private whenUsersAdded(event: UsersAddedEvent) {
    this.challengeState = this.challengeState.withUsersAdded(event)
  }

  isPending(): boolean {
    return this.challengeState.isPending()
  }

  static create(stream: Array<DomainEvent>): Challenge {
    return new Challenge(stream)
  }

  static createStarted(
    id: string,
    habitId: HabitId,
    target: number,
    partner: string,
    project: string,
    cost: number,
    deadline: Date,
    users: string[],
  ): Challenge {
    const challengeId = ChallengeId.create(id)
    const challenge = new Challenge()

    challenge.start(
      challengeId,
      habitId,
      target,
      partner,
      project,
      cost,
      deadline,
      users,
    )
    return challenge
  }

  start(
    id: ChallengeId,
    habitId: HabitId,
    target: number,
    partner: string,
    project: string,
    cost: number,
    deadline: Date,
    users: string[],
  ): void {
    if (this.isPending()) {
      return
    }

    this.apply(
      ChallengeStartedEvent.with(
        id,
        habitId,
        target,
        partner,
        project,
        cost,
        deadline,
        users,
      ),
    )
  }
}
