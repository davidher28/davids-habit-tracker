import { UUId } from '../shared/uuid'

export class HabitId extends UUId {
  static create(habitId: string): HabitId {
    return new HabitId(habitId)
  }
}
