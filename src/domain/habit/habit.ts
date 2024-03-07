import { HabitId } from './habit.id'
import { UserId } from '../user/user.id'
import { HabitName } from './habit.name'
import { HabitDescription } from './habit.description'
import { HabitFrequency } from './habit.frequency'

export class Habit {
  readonly id: HabitId
  readonly name: HabitName
  private description: HabitDescription
  private frequency: HabitFrequency
  private habitTime: number
  private restTime: number
  readonly userId: UserId
  private wearableDeviceId?: string
  private readonly createdAt: Date
  private updatedAt: Date

  constructor(
    id: HabitId,
    name: HabitName,
    description: HabitDescription,
    frequency: HabitFrequency,
    userId: UserId,
    wearableDeviceId?: string,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.frequency = frequency
    this.userId = userId
    this.wearableDeviceId = wearableDeviceId
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  get idValue(): string {
    return this.id.value
  }

  get nameValue(): string {
    return this.name.value
  }

  get descriptionValue(): string {
    return this.description.value
  }

  get frequencyValue(): string {
    return this.frequency.value
  }

  get userIdValue(): string {
    return this.userId.value
  }
}
