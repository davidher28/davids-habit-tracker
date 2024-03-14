import { HabitId } from './habit.id'
import { UserId } from '../user/user.id'
import { HabitName } from './habit.name'
import { HabitDescription } from './habit.description'
import { Frequency, HabitSchedule } from './habit.schedule'
import { AggregateRoot } from '@nestjs/cqrs'
import { ProgressCreatedEvent } from './progress-created.event'
import { Progress } from './progress'
import { Reminder } from './reminder'
import { Challenge } from './challenge'
import { UUId } from '../shared/uuid'

export class Habit extends AggregateRoot {
  readonly id: HabitId
  readonly name: HabitName
  private description: HabitDescription
  private schedule: HabitSchedule
  readonly userId: UserId
  readonly wearableDeviceId?: string
  private readonly createdAt: Date
  private updatedAt: Date

  private progress: Progress[] = []
  private challenges: Challenge[] = []
  private reminders: Reminder[] = []

  constructor(
    id: HabitId,
    name: HabitName,
    description: HabitDescription,
    schedule: HabitSchedule,
    userId: UserId,
    wearableDeviceId?: string,
  ) {
    super()
    this.autoCommit = true
    this.id = id
    this.name = name
    this.description = description
    this.schedule = schedule
    this.userId = userId
    this.wearableDeviceId = wearableDeviceId
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static create(
    name: string,
    description: string,
    frequency: Frequency,
    duration: number,
    restTime: number,
    userId: string,
    wearableDeviceId?: string,
  ): Habit {
    const uuid = UUId.generate()
    const habitId = HabitId.create(uuid)

    return new Habit(
      habitId,
      HabitName.create(name),
      HabitDescription.create(description),
      HabitSchedule.create(frequency, duration, restTime),
      UserId.create(userId),
      wearableDeviceId,
    )
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

  get getProgress(): Progress[] {
    return this.progress
  }

  get getChallenges(): Challenge[] {
    return this.challenges
  }

  get getReminders(): Reminder[] {
    return this.reminders
  }

  addProgress(progress: Progress): void {
    this.progress.push(progress)
    this.apply(ProgressCreatedEvent.createFromProgress(progress))
  }

  addChallenge(challenge: Challenge): void {
    this.challenges.push(challenge)
  }

  addReminder(reminder: Reminder): void {
    if (this.reminders.length === 3) {
      throw new Error('Only 3 reminders are allowed')
    }
    this.reminders.push(reminder)
  }
}
