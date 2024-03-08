import { v4 as uuidv4 } from 'uuid'
import {
  HabitDescription,
  HabitId,
  HabitName,
  HabitSchedule,
  UserId,
} from '../../src/domain'
import { Habit } from '../../src/domain'
import { Frequency } from '../../src/domain/habit/habit.schedule'

export class HabitMother {
  private id: string = uuidv4()
  private name: string = Math.random().toString().substring(4)
  private description: string = Math.random().toString().substring(10)
  private frequency: Frequency = Frequency.DAILY
  private duration: number = 10
  private restTime: number = 5

  build(userId?: string): Habit {
    const habitId = HabitId.create(this.id)
    const habitName = HabitName.create(this.name)
    const habitDescription = HabitDescription.create(this.description)
    const habitSchedule = HabitSchedule.create(
      this.frequency,
      this.duration,
      this.restTime,
    )
    const userIdObj = UserId.create(userId || uuidv4())
    return new Habit(
      habitId,
      habitName,
      habitDescription,
      habitSchedule,
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
