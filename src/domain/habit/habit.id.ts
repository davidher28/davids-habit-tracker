import { UUId } from '../shared/uuid.value-object'

export class HabitId extends UUId {
  static create(habitId: string): HabitId {
    return new HabitId(habitId)
  }
}
