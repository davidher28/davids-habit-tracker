import { UUId } from '../shared/uuid'

export class ProgressId extends UUId {
  public static create(progressId: string): ProgressId {
    return new ProgressId(progressId)
  }
}
