import { IEvent } from '@nestjs/cqrs'
import { UserId } from '../user/user.id'

export class ChallengeCompletedEvent implements IEvent {
  private constructor(public readonly userId: string) {}

  public static createWithUserId(userId: UserId): ChallengeCompletedEvent {
    return new ChallengeCompletedEvent(userId.value)
  }
}
