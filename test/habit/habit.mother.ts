import { v4 as uuidv4 } from 'uuid'
import {
  HabitDescription,
  HabitFrequency,
  HabitId,
  HabitName,
  UserId,
} from '../../src/domain'
import { Habit } from '../../src/domain'
import { Frequency } from '../../src/domain/habit/habit.frequency'

export class HabitMother {
  private id: string = uuidv4()
  private name: string = Math.random().toString().substring(4)
  private description: string = Math.random().toString().substring(10)
  private frequency: string = Frequency.DAILY

  build(userId?: string): Habit {
    const habitId = HabitId.create(this.id)
    const habitName = HabitName.create(this.name)
    const habitDescription = HabitDescription.create(this.description)
    const habitFrequency = HabitFrequency.create(this.frequency)
    const userIdObj = UserId.create(userId || uuidv4())
    return new Habit(
      habitId,
      habitName,
      habitDescription,
      habitFrequency,
      userIdObj,
    )
  }

  static create(): Habit {
    return new HabitMother().build()
  }

  static createWithUserId(userId: string): Habit {
    return new HabitMother().build(userId)
  }
}
