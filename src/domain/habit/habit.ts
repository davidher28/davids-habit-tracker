import { HabitId } from './habit.id'
import { UserId } from '../user/user.id'
import { HabitName } from './habit.name'
import { HabitDescription } from './habit.description'
import { HabitFrequency } from './habit.frequency'

export class Habit {
  private readonly id: HabitId
  private name: HabitName
  private description: HabitDescription
  private frequency: HabitFrequency
  private habitTime: number
  private restTime: number
  private readonly userId: UserId
  private readonly createdAt: Date
  private updatedAt: Date

  constructor(
    id: HabitId,
    name: HabitName,
    description: HabitDescription,
    frequency: HabitFrequency,
    habitTime: number,
    restTime: number,
    userId: UserId,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.frequency = frequency
    this.habitTime = habitTime
    this.restTime = restTime
    this.userId = userId
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }
}
