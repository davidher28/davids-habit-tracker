import { v4 as uuidv4 } from 'uuid'
import { Frequency } from '../../src/core/domain/habit/habit.schedule'
import { Habit } from '../../src/core/domain/habit/habit'

export class HabitMother {
  private name: string = Math.random().toString().substring(4)
  private description: string = Math.random().toString().substring(10)
  private frequency: Frequency = Frequency.DAILY
  private duration: number = 10
  private restTime: number = 5

  public static create(): Habit {
    return new HabitMother().build()
  }

  public static createWithUserId(userId: string): Habit {
    return new HabitMother().build(userId)
  }

  private build(userId?: string): Habit {
    return Habit.create(
      this.name,
      this.description,
      this.frequency,
      this.duration,
      this.restTime,
      userId || uuidv4(),
    )
  }
}
