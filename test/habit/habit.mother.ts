import { v4 as uuidv4 } from 'uuid'
import { Habit } from '../../src/domain'
import { Frequency } from '../../src/domain/habit/habit.schedule'

export class HabitMother {
  private name: string = Math.random().toString().substring(4)
  private description: string = Math.random().toString().substring(10)
  private frequency: Frequency = Frequency.DAILY
  private duration: number = 10
  private restTime: number = 5

  build(userId?: string): Habit {
    return Habit.create(
      this.name,
      this.description,
      this.frequency,
      this.duration,
      this.restTime,
      userId || uuidv4(),
    )
  }

  static create(): Habit {
    return new HabitMother().build()
  }

  static createWithUserId(userId: string): Habit {
    return new HabitMother().build(userId)
  }
}
