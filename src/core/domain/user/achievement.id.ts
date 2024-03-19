import { UUId } from '../shared/uuid'

export class AchievementId extends UUId {
  public static create(achievementId: string): AchievementId {
    return new AchievementId(achievementId)
  }
}
