import { UUId } from '../shared/uuid'

export class ChallengeId extends UUId {
  static create(value: string): ChallengeId {
    return new ChallengeId(value)
  }
}
