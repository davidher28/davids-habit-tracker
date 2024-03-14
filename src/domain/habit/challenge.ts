import { HabitId } from './habit.id'
import { ChallengeId } from './challenge.id'
import { UUId } from '../shared/uuid'

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
    habitId: string,
    numberOfTimes: number,
    startDate: Date,
    endDate: Date,
  ): Challenge {
    const uuid = UUId.generate()
    const challengeId = ChallengeId.create(uuid)

    return new Challenge(
      challengeId,
      HabitId.create(habitId),
      numberOfTimes,
      startDate,
      endDate,
    )
  }

  get habitIdValue(): string {
    return this.habitId.value
  }
}
