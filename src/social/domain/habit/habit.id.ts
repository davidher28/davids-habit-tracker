import { UUId } from '../shared/uuid'

export class HabitId extends UUId {
  public static create(habitId: string): HabitId {
    return new HabitId(habitId)
  }

  public static empty(): HabitId {
    return new HabitId('')
  }
}
