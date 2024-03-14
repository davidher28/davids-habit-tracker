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
import { ReminderLimitError } from './reminder.limit.error'
import { WearableService } from '../shared/wearable.service'

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

  usesWearableDevice(): boolean {
    return this.wearableDeviceId !== undefined
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

  public addProgress(
    habitId: string,
    progressDate: Date,
    observations: string,
    wearableService: WearableService,
  ): void {
    const validated = this.validateWearableDevice(wearableService)
    const progress = Progress.create(
      habitId,
      progressDate,
      observations,
      validated,
    )
    this.progress.push(progress)

    this.apply(ProgressCreatedEvent.createFromProgress(progress))
  }

  public addChallenge(
    habitId: string,
    description: string,
    habitTimes: number,
    startDate: Date,
    endDate: Date,
  ): void {
    const challenge = Challenge.create(
      habitId,
      description,
      habitTimes,
      startDate,
      endDate,
    )
    this.challenges.push(challenge)
  }

  public addReminder(
    habitId: string,
    message: string,
    state: string,
    time: string,
  ): void {
    if (this.reminders.length === 3) {
      throw ReminderLimitError.withMessage('Only 3 reminders are allowed')
    }

    const reminder = Reminder.create(habitId, message, state, time)
    this.reminders.push(reminder)
  }

  private validateWearableDevice(wearableService: WearableService): boolean {
    if (this.usesWearableDevice()) {
      return wearableService.execute(this.wearableDeviceId)
    }
    return false
  }
}
