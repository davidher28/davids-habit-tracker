import { IEvent } from '@nestjs/cqrs'
import { HabitId } from './habit.id'

export class HabitCancelledEvent implements IEvent {
  private constructor(public readonly habitId: string) {}

  public static createFromHabitId(habitId: HabitId): HabitCancelledEvent {
    return new HabitCancelledEvent(habitId.value)
  }
}
