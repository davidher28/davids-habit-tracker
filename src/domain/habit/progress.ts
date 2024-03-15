import { ProgressId } from './progress.id'
import { HabitId } from './habit.id'
import { ProgressDate } from './progress.date'
import { ProgressObservations } from './progress.observations'
import { UUId } from '../shared/uuid'

export class Progress {
  private readonly id: ProgressId
  private readonly progressDate: ProgressDate
  private readonly observations: ProgressObservations
  private readonly validated: boolean

  private constructor(
    id: ProgressId,
    readonly habitId: HabitId,
    progressDate: ProgressDate,
    observations: ProgressObservations,
    validated: boolean,
  ) {
    this.id = id
    this.habitId = habitId
    this.progressDate = progressDate
    this.observations = observations
    this.validated = validated
  }

  static create(
    habitId: string,
    progressDate: Date,
    observations: string,
    validated: boolean = false,
  ): Progress {
    const uuid = UUId.generate()
    const progressId = ProgressId.create(uuid)

    return new Progress(
      progressId,
      HabitId.create(habitId),
      ProgressDate.create(progressDate),
      ProgressObservations.create(observations),
      validated,
    )
  }

  get idValue(): string {
    return this.id.value
  }

  get habitIdValue(): string {
    return this.habitId.value
  }

  get progressDateValue(): Date {
    return this.progressDate.value
  }

  get observationsValue(): string {
    return this.observations.value
  }

  get isValidated(): boolean {
    return this.validated
  }
}
