import { UUId } from '../shared/uuid'

export class ProgressId extends UUId {
  static create(progressId: string): ProgressId {
    return new ProgressId(progressId)
  }
}
