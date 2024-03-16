import { HabitId } from './habit.id'
import { ChallengeId } from './challenge.id'
import { UUId } from '../shared/uuid'
import { ChallengeDescription } from './challenge.description'

export enum ChallengeStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED',
}

export class Challenge {
  readonly id: ChallengeId
  readonly habitId: HabitId
  readonly description: ChallengeDescription
  readonly habitTimes: number
  recordedTimes: number
  status: ChallengeStatus
  readonly startDate: Date
  readonly endDate: Date

  private constructor(
    id: ChallengeId,
    habitId: HabitId,
    challengeDescription: ChallengeDescription,
    habitTimes: number,
    status: ChallengeStatus,
    startDate: Date,
    endDate: Date,
  ) {
    this.id = id
    this.habitId = habitId
    this.description = challengeDescription
    this.habitTimes = habitTimes
    this.status = status
    this.startDate = startDate
    this.endDate = endDate
  }

  static create(
    habitId: string,
    description: string,
    habitTimes: number,
    startDate: Date,
    endDate: Date,
  ): Challenge {
    const uuid = UUId.generate()
    const challengeId = ChallengeId.create(uuid)

    return new Challenge(
      challengeId,
      HabitId.create(habitId),
      ChallengeDescription.create(description),
      habitTimes,
      ChallengeStatus.PENDING,
      startDate,
      endDate,
    )
  }

  get idValue(): string {
    return this.id.value
  }

  public registerProgress(): void {
    if (!this.isPending()) {
      return
    }
    this.increaseRecordedTimes()
    this.updateStatus()
  }

  public isPending(): boolean {
    return this.status === ChallengeStatus.PENDING
  }

  public isExceededDate(): boolean {
    return new Date() > this.endDate
  }

  public hasReachedTheGoal(): boolean {
    return this.recordedTimes === this.habitTimes
  }

  private updateStatus(): void {
    if (this.isPending() && this.isExceededDate()) {
      this.modifyStatus(ChallengeStatus.EXPIRED)
    }

    if (this.isPending() && this.hasReachedTheGoal()) {
      this.modifyStatus(ChallengeStatus.COMPLETED)
    }
  }

  private increaseRecordedTimes(): void {
    this.recordedTimes++
  }

  private modifyStatus(status: ChallengeStatus): void {
    this.status = status
  }
}
