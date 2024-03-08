import { HabitId } from './habit.id'
import { UserId } from '../user/user.id'
import { HabitName } from './habit.name'
import { HabitDescription } from './habit.description'
import { Frequency, HabitSchedule } from './habit.schedule'

export class Habit {
  readonly id: HabitId
  readonly name: HabitName
  private description: HabitDescription
  private schedule: HabitSchedule
  readonly userId: UserId
  readonly wearableDeviceId?: string
  private readonly createdAt: Date
  private updatedAt: Date

  constructor(
    id: HabitId,
    name: HabitName,
    description: HabitDescription,
    schedule: HabitSchedule,
    userId: UserId,
    wearableDeviceId?: string,
  ) {
    this.id = id
    this.name = name
    this.description = description
    this.schedule = schedule
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

  get scheduleValue(): {
    frequency: Frequency
    duration: number
    restTime: number
  } {
    return {
      frequency: this.schedule.frequency,
      duration: this.schedule.duration,
      restTime: this.schedule.restTime,
    }
  }

  get userIdValue(): string {
    return this.userId.value
  }
}
