import { HabitId, Progress } from '../../domain'
import { ProgressRepository } from '../../domain/habit/progress.repository'

export class InMemoryProgressRepository implements ProgressRepository {
  private progress: Progress[] = []

  save(progress: Progress): void {
    this.progress.push(progress)
  }

  findByHabitId(habitId: HabitId): Progress[] {
    return this.progress.filter(
      (progress) => progress.habitIdValue === habitId.value,
    )
  }
}
