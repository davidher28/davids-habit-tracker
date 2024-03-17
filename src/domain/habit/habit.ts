import { HabitId } from './habit.id'
import { UserId } from '../user/user.id'
import { HabitName } from './habit.name'
import { HabitDescription } from './habit.description'
import { Frequency, HabitSchedule } from './habit.schedule'
import { AggregateRoot } from '@nestjs/cqrs'
import { ProgressCreatedEvent } from './progress-created.event'
import { Progress } from './progress'
import { Reminder, ReminderStatus } from './reminder'
import { UUId } from '../shared/uuid'
import { ReminderLimitError } from './reminder.limit.error'
import { WearableService } from '../shared/wearable.service'
import { ReminderAlreadyExistsError } from './reminder.already-exists.error'
import { HabitCancelledEvent } from './habit-cancelled.event'

export enum HabitStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export class Habit extends AggregateRoot {
  private readonly createdAt: Date
  private updatedAt: Date
  private status: HabitStatus

  readonly progress: Progress[] = []
  readonly reminders: Reminder[] = []

  private readonly REMINDERS_LIMIT: number = 3

  private constructor(
    readonly id: HabitId,
    readonly name: HabitName,
    readonly description: HabitDescription,
    readonly schedule: HabitSchedule,
    readonly userId: UserId,
    readonly wearableDeviceId?: string,
  ) {
    super()
    this.autoCommit = true
    this.id = id
    this.name = name
    this.description = description
    this.schedule = schedule
    this.userId = userId
    this.wearableDeviceId = wearableDeviceId
    this.status = HabitStatus.PENDING
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  public static create(
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

  get getProgress(): Progress[] {
    return this.progress
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
    const progress = Progress.create(
      habitId,
      progressDate,
      observations,
      this.isWearableDeviceValidated(wearableService),
    )
    this.progress.push(progress)

    this.apply(ProgressCreatedEvent.createFromProgress(progress))
  }

  public addReminder(
    habitId: string,
    message: string,
    status: ReminderStatus,
    time: string,
  ): void {
    if (this.isExistingReminder(time)) {
      throw ReminderAlreadyExistsError.withMessage(
        'Reminder time already exists.',
      )
    }

    if (this.reminders.length === this.REMINDERS_LIMIT) {
      throw ReminderLimitError.withMessage('Only 3 reminders are allowed.')
    }

    const reminder = Reminder.create(habitId, message, status, time)
    this.reminders.push(reminder)
  }

  public cancel(): void {
    this.modifyStatus(HabitStatus.CANCELLED)
    this.apply(HabitCancelledEvent.createFromHabitId(this.id))
  }

  public modifyStatus(status: HabitStatus): void {
    this.status = status
  }

  private isExistingReminder(time: string): boolean {
    return this.reminders.some((reminder) => reminder.timeValue === time)
  }

  private isWearingDevice(): boolean {
    return this.wearableDeviceId !== undefined
  }

  private isWearableDeviceValidated(wearableService: WearableService): boolean {
    if (this.isWearingDevice()) {
      return wearableService.execute(this.wearableDeviceId)
    }
    return false
  }
}
