import { v4 as uuidv4 } from 'uuid'
import { Challenge } from '../../src/core/domain/challenge/challenge'

export class ChallengeMother {
  private description: string = Math.random().toString().substring(10)
  private habitRepetitionTimes: number = 1

  public static create(): Challenge {
    return new ChallengeMother().build()
  }

  public static createWithHabitId(habitId: string): Challenge {
    return new ChallengeMother().build(habitId)
  }

  private build(habitId?: string): Challenge {
    const futureDate = new Date()
    futureDate.setDate(futureDate.getDate() + 10)

    return Challenge.create(
      habitId || uuidv4(),
      this.description,
      this.habitRepetitionTimes,
      new Date(),
      futureDate,
    )
  }
}
