import { v4 as uuidv4 } from 'uuid'
import { Challenge } from '../../src/domain'

export class ChallengeMother {
  private description: string = Math.random().toString().substring(10)
  private habitRepetitionTimes: number = Math.random()

  public static create(): Challenge {
    return new ChallengeMother().build()
  }

  private build(): Challenge {
    return Challenge.create(
      uuidv4(),
      this.description,
      this.habitRepetitionTimes,
      new Date(),
      new Date(),
    )
  }
}
