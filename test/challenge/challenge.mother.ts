import { v4 as uuidv4 } from 'uuid'
import { Challenge } from '../../src/domain'

export class ChallengeMother {
  private description: string = Math.random().toString().substring(10)
  private habitTimes: number = Math.random()

  build(): Challenge {
    return Challenge.create(
      uuidv4(),
      this.description,
      this.habitTimes,
      new Date(),
      new Date(),
    )
  }

  static create(): Challenge {
    return new ChallengeMother().build()
  }
}
