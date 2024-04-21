import { EventSourcedEntity } from '../shared/event-sourced.entity'
import { ChallengeStartedEvent } from './challenge-started.event'
import { ChallengeState } from './challenge.state'
import { ProgressLoggedEvent } from './progress-logged.event'
import { HabitId } from '../habit/habit.id'
import { DomainEvent } from '../shared/domain.event'
import { ChallengeId } from './challenge.id'
import { UsersAddedEvent } from './users-added.event'
import { AlreadyAttachedUserError } from '../../application/command/challenge/already-attached-user.error'

export class Challenge extends EventSourcedEntity {
  private challengeState: ChallengeState

  protected constructor(stream: DomainEvent[] = []) {
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

    if (this.challengeState === undefined) {
      this.challengeState = ChallengeState.empty()
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

  private isPending(): boolean {
    return this.challengeState.isPending()
  }

  private isDateAfterDeadline(date: Date): boolean {
    return this.challengeState.deadline < date
  }

  static create(stream: DomainEvent[]): Challenge {
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

  addUsers(users: string[]): void {
    if (this.challengeState.users.some((user) => users.includes(user))) {
      throw AlreadyAttachedUserError.withMessage(
        'User already belongs to the challenge.',
      )
    }
    this.apply(UsersAddedEvent.with(this.challengeState.id, users))
  }

  logProgress(progress: number): void {
    const progressDate = new Date()
    if (this.isDateAfterDeadline(progressDate)) {
      return
    }

    this.apply(
      ProgressLoggedEvent.with(this.challengeState.id, progress, progressDate),
    )
  }
}
