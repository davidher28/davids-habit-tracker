import { ProgressId } from './progress.id'
import { HabitId } from './habit.id'
import { ProgressDate } from './progress.date'
import { ProgressObservations } from './progress.observations'

export class Progress {
  private readonly id: ProgressId
  private readonly progressDate: ProgressDate
  private readonly observations: ProgressObservations

  constructor(
    id: ProgressId,
    readonly habitId: HabitId,
    progressDate: ProgressDate,
    observations: ProgressObservations,
  ) {
    this.id = id
    this.habitId = habitId
    this.progressDate = progressDate
    this.observations = observations
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
}
