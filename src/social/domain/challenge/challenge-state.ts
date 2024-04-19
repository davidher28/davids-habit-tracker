import { HabitId } from '../habit/habit.id'
import { ChallengeStartedEvent } from './challenge-started.event'
import { ChallengeId } from './challenge-id'
import { ChallengeStatus } from './challenge.status'
import { ProgressLoggedEvent } from './progress-logged.event'
import { UsersAddedEvent } from './users-added.event'
import { ChallengePartner } from './challenge.partner'
import { ChallengeProject } from './challenge.project'
import { ChallengeCost } from './challenge.cost'

export class ChallengeState {
  constructor(
    readonly id: ChallengeId,
    readonly habitId: HabitId,
    readonly target: number,
    readonly partner: ChallengePartner,
    readonly project: ChallengeProject,
    readonly cost: ChallengeCost,
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
      ChallengePartner.empty(),
      ChallengeProject.empty(),
      ChallengeCost.empty(),
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
      ChallengePartner.create(event.payload.partner),
      ChallengeProject.create(event.payload.project),
      ChallengeCost.create(event.payload.cost),
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
