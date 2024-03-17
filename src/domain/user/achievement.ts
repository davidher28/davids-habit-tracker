import { UUId } from '../shared/uuid'
import { AchievementId } from './achievement.id'
import { UserId } from './user.id'
import { ChallengeId } from '../challenge/challenge.id'

export class Achievement {
  private constructor(
    readonly id: AchievementId,
    readonly challengeId: ChallengeId,
    readonly userId: UserId,
    readonly date: Date,
  ) {
    this.id = id
    this.challengeId = challengeId
    this.userId = userId
    this.date = date
  }

  public static create(
    challengeId: string,
    userId: string,
    date: Date,
  ): Achievement {
    const uuid = UUId.generate()
    const achievementId = AchievementId.create(uuid)

    return new Achievement(
      achievementId,
      ChallengeId.create(challengeId),
      UserId.create(userId),
      date,
    )
  }
}
