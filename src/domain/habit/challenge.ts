import { HabitId } from './habit.id'
import { ChallengeId } from './challenge.id'
import { UUId } from '../shared/uuid'
import { ChallengeDescription } from './challenge.description'

export class Challenge {
  readonly id: ChallengeId
  readonly habitId: HabitId
  readonly description: ChallengeDescription
  readonly habitTimes: number
  readonly startDate: Date
  readonly endDate: Date

  constructor(
    id: ChallengeId,
    habitId: HabitId,
    challengeDescription: ChallengeDescription,
    habitTimes: number,
    startDate: Date,
    endDate: Date,
  ) {
    this.id = id
    this.habitId = habitId
    this.description = challengeDescription
    this.habitTimes = habitTimes
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
      startDate,
      endDate,
    )
  }

  get habitIdValue(): string {
    return this.habitId.value
  }
}
