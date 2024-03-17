import { HabitId } from '../habit/habit.id'
import { ChallengeId } from './challenge.id'
import { UUId } from '../shared/uuid'
import { ChallengeDescription } from './challenge.description'
import { AggregateRoot } from '@nestjs/cqrs'
import { ChallengeUnableToCancelError } from './challenge.unable-to-cancel.error'
import { ChallengeCompletedEvent } from './challenge-completed.event'
import { UserId } from '../user/user.id'

export enum ChallengeStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export class Challenge extends AggregateRoot {
  private habitRemainingRepetitionTimes: number
  private status: ChallengeStatus

  private constructor(
    readonly id: ChallengeId,
    readonly habitId: HabitId,
    readonly description: ChallengeDescription,
    readonly habitRepetitionTimes: number,
    readonly startDate: Date,
    readonly endDate: Date,
  ) {
    super()
    this.autoCommit = true
    this.id = id
    this.habitId = habitId
    this.description = description
    this.habitRepetitionTimes = habitRepetitionTimes
    this.habitRemainingRepetitionTimes = habitRepetitionTimes
    this.status = ChallengeStatus.PENDING
    this.startDate = startDate
    this.endDate = endDate
  }

  public static create(
    habitId: string,
    description: string,
    habitRepetitionTimes: number,
    startDate: Date,
    endDate: Date,
  ): Challenge {
    const uuid = UUId.generate()
    const challengeId = ChallengeId.create(uuid)

    return new Challenge(
      challengeId,
      HabitId.create(habitId),
      ChallengeDescription.create(description),
      habitRepetitionTimes,
      startDate,
      endDate,
    )
  }

  get idValue(): string {
    return this.id.value
  }

  public cancel(): void {
    if (!this.isCancellable()) {
      throw ChallengeUnableToCancelError.withMessage(
        'Challenge cannot be canceled as it is in a non-cancellable status.',
      )
    }

    this.modifyStatus(ChallengeStatus.CANCELLED)
  }

  public modifyStatus(status: ChallengeStatus): void {
    this.status = status
  }

  public addProgress(userId: UserId): void {
    if (!this.isPending()) {
      return
    }
    this.updateStatus(userId)
  }

  public isPending(): boolean {
    return this.status === ChallengeStatus.PENDING
  }

  public isExceededDate(): boolean {
    return new Date() > this.endDate
  }

  public hasReachedTheGoal(): boolean {
    return this.habitRemainingRepetitionTimes === 0
  }

  private isCancellable(): boolean {
    return (
      this.status !== ChallengeStatus.CANCELLED &&
      this.status !== ChallengeStatus.COMPLETED
    )
  }

  private updateStatus(userId: UserId): void {
    this.decreaseRecordedTimes()

    if (this.isExceededDate()) {
      this.modifyStatus(ChallengeStatus.EXPIRED)
      return
    }

    if (this.hasReachedTheGoal()) {
      this.modifyStatus(ChallengeStatus.COMPLETED)
      this.apply(ChallengeCompletedEvent.createWithUserId(userId))
    }
  }

  private decreaseRecordedTimes(): void {
    this.habitRemainingRepetitionTimes--
  }
}
