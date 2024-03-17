import { IEvent } from '@nestjs/cqrs'
import { HabitId } from './habit.id'
import { Progress } from './progress'

export class ProgressCreatedEvent implements IEvent {
  private constructor(public readonly habitId: HabitId) {}

  public static createFromProgress(progress: Progress) {
    return new ProgressCreatedEvent(progress.habitId)
  }
}
