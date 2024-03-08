import { UUId } from '../shared/uuid.value-object'

export class UserId extends UUId {
  static create(userId: string): UserId {
    return new UserId(userId)
  }
}
