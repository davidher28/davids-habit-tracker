import { ProgressId } from './progress.id'
import { HabitId } from '../habit/habit.id'
import { ProgressDate } from './progress.date'
import { ProgressObservations } from './progress.observations'

export class Progress {
  private readonly id: ProgressId
  private readonly habitId: HabitId
  private readonly progressDate: ProgressDate
  private readonly observations: ProgressObservations

  constructor(
    id: ProgressId,
    habitId: HabitId,
    progressDate: ProgressDate,
    observations: ProgressObservations,
  ) {
    this.id = id
    this.habitId = habitId
    this.progressDate = progressDate
    this.observations = observations
  }
}
