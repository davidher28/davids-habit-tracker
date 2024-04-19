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
    switch (e.type) {
      case ChallengeStartedEvent.TYPE:
        this.whenChallengeStarted(e as unknown as ChallengeStartedEvent)
        break
      case ProgressLoggedEvent.TYPE:
        this.whenProgressLogged(e as unknown as ProgressLoggedEvent)
        break
      case UsersAddedEvent.TYPE:
        this.whenUsersAdded(e as unknown as UsersAddedEvent)
        break
      default:
        throw new Error('Unknown event type')
    }
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
  private hasReachedTheGoal(): boolean {
    return this.challengeState.hasReachedTheTarget()
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
