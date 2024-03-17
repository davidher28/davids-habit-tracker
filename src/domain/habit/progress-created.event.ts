import { IEvent } from '@nestjs/cqrs'
import { HabitId } from './habit.id'

export class ProgressCreatedEvent implements IEvent {
  private constructor(public readonly habitId: string) {}

  public static createFromHabitId(habitId: HabitId): ProgressCreatedEvent {
    return new ProgressCreatedEvent(habitId.value)
  }
}
