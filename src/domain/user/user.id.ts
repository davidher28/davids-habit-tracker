import { UUId } from '../shared/uuid'

export class UserId extends UUId {
  public static create(userId: string): UserId {
    return new UserId(userId)
  }
}
