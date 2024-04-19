import { HabitId } from '../habit/habit.id'
import { ChallengeStartedEvent } from './challenge-started.event'
import { ChallengeId } from './challenge-id'
import { ChallengeStatus } from './challenge.status'
import { ProgressLoggedEvent } from './progress-logged.event'
import { UsersAddedEvent } from './users-added.event'

export class ChallengeState {
  constructor(
    readonly id: ChallengeId,
    readonly habitId: HabitId,
    readonly target: number,
    readonly partner: string,
    readonly project: string,
    readonly cost: number,
    readonly deadline: Date,
    readonly progress: number,
    readonly status: ChallengeStatus,
    readonly users: string[],
  ) {}

  static empty(): ChallengeState {
    return new ChallengeState(
      ChallengeId.empty(),
      HabitId.empty(),
      0,
      '',
      '',
      0,
      new Date(),
      0,
      ChallengeStatus.empty(),
      [],
    )
  }

  withChallengeStarted(event: ChallengeStartedEvent): ChallengeState {
    return new ChallengeState(
      ChallengeId.create(event.payload.challengeId),
      HabitId.create(event.payload.habitId),
      event.payload.target,
      event.payload.partner,
      event.payload.project,
      event.payload.cost,
      event.payload.deadline,
      0,
      ChallengeStatus.started(),
      event.payload.users,
    )
  }

  withUsersAdded(event: UsersAddedEvent): ChallengeState {
    return new ChallengeState(
      this.id,
      this.habitId,
      this.target,
      this.partner,
      this.project,
      this.cost,
      this.deadline,
      this.progress,
      this.status,
      [...this.users, ...event.payload.users],
    )
  }

  withProgressLogged(event: ProgressLoggedEvent): ChallengeState {
    const isCompleted =
      this.progress + event.payload.progress >= this.target &&
      !this.hasReachedTheTarget()
    return new ChallengeState(
      this.id,
      this.habitId,
      this.target,
      this.partner,
      this.project,
      this.cost,
      this.deadline,
      this.progress + event.payload.progress,
      isCompleted ? ChallengeStatus.completed() : ChallengeStatus.started(),
      this.users,
    )
  }

  hasReachedTheTarget() {
    return this.target <= this.progress
  }

  isPending() {
    return this.status.isPending()
  }
}
