import { IEvent } from '@nestjs/cqrs'
import { Progress } from './progress'

export class ProgressCreatedEvent implements IEvent {
  private constructor(public readonly habitId: string) {}

  public static createFromProgress(progress: Progress): ProgressCreatedEvent {
    return new ProgressCreatedEvent(progress.habitId.value)
  }
}
