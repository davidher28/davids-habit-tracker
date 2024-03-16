import { HabitId } from './habit.id'
import { UserId } from '../user/user.id'
import { HabitName } from './habit.name'
import { HabitDescription } from './habit.description'
import { Frequency, HabitSchedule } from './habit.schedule'
import { AggregateRoot } from '@nestjs/cqrs'
import { ProgressCreatedEvent } from './progress-created.event'
import { Progress } from './progress'
import { Reminder, ReminderStatus } from './reminder'
import { Challenge } from './challenge'
import { UUId } from '../shared/uuid'
import { ReminderLimitError } from './reminder.limit.error'
import { WearableService } from '../shared/wearable.service'
import { ReminderAlreadyExistsError } from './reminder.already-exists.error'
import { ChallengeId } from './challenge.id'
import { ChallengeNotFoundError } from './challenge.not-found.error'

export class Habit extends AggregateRoot {
  readonly id: HabitId
  readonly name: HabitName
  private description: HabitDescription
  private schedule: HabitSchedule
  readonly userId: UserId
  readonly wearableDeviceId?: string
  private readonly createdAt: Date
  private updatedAt: Date

  private challenges: Challenge[] = []
  private progress: Progress[] = []
  private reminders: Reminder[] = []

  private constructor(
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

  public cancelChallenge(challengeId: ChallengeId): void {
    if (!this.isExistingChallenge(challengeId.value)) {
      throw ChallengeNotFoundError.withId(challengeId.value)
    }

    // TODO: Cancel the challenge
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

    if (this.reminders.length === 3) {
      throw ReminderLimitError.withMessage('Only 3 reminders are allowed.')
    }

    const reminder = Reminder.create(habitId, message, status, time)
    this.reminders.push(reminder)
  }

  public registerProgress(): void {
    this.challenges.forEach((challenge) => {
      challenge.registerProgress()

      // TODO: Create Achievement
    })
  }

  private isExistingReminder(time: string): boolean {
    return this.reminders.some((reminder) => reminder.timeValue === time)
  }

  private isExistingChallenge(challengeId: string): boolean {
    return this.challenges.some(
      (challenge) => challenge.idValue === challengeId,
    )
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
