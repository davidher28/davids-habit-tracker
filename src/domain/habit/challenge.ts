import { HabitId } from './habit.id'
import { ChallengeId } from './challenge.id'

export class Challenge {
  readonly id: ChallengeId
  readonly habitId: HabitId
  readonly numberOfTimes: number
  readonly startDate: Date
  readonly endDate: Date

  constructor(
    id: ChallengeId,
    habitId: HabitId,
    numberOfTimes: number,
    startDate: Date,
    endDate: Date,
  ) {
    this.id = id
    this.habitId = habitId
    this.numberOfTimes = numberOfTimes
    this.startDate = startDate
    this.endDate = endDate
  }

  static create(
    id: ChallengeId,
    habitId: HabitId,
    numberOfTimes: number,
    startDate: Date,
    endDate: Date,
  ): Challenge {
    return new Challenge(id, habitId, numberOfTimes, startDate, endDate)
  }

  get habitIdValue(): string {
    return this.habitId.value
  }
}
