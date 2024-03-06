import { v4 as uuidv4 } from 'uuid'
import { HabitDescription, HabitId, HabitName, UserId } from '../../src/domain'
import { Habit } from '../../src/domain/habit/habit'

export class HabitMother {
  private id: string = uuidv4()
  private name: string = 'habitName'
  private description: string = 'habitDescription'
  private userId: string = uuidv4()

  build(): Habit {
    const habitId = HabitId.create(this.id)
    const habitName = HabitName.create(this.name)
    const habitDescription = HabitDescription.create(this.description)
    const userId = UserId.create(this.userId)
    return new Habit(habitId, habitName, habitDescription, userId)
  }

  static create(): Habit {
    return new HabitMother().build()
  }
}
