import { UUId } from '../shared/uuid'

export class ChallengeId extends UUId {
  public static create(value: string): ChallengeId {
    this.guardValidId(value)
    return new ChallengeId(value)
  }

  public static empty(): ChallengeId {
    return new ChallengeId('')
  }
}
