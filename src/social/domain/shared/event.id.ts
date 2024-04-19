import { UUId } from './uuid'

export class EventId extends UUId {
  static new(): EventId {
    return new EventId(UUId.generate())
  }
}
