import { UUId } from '../shared/uuid'

export class ReminderId extends UUId {
  static create(value: string): ReminderId {
    return new ReminderId(value)
  }
}
