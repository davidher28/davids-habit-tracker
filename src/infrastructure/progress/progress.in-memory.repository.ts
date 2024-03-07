import { Progress } from '../../domain'
import { ProgressRepository } from '../../domain/progress/progress.repository'

export class InMemoryProgressRepository implements ProgressRepository {
  private progress: Progress[] = []
}
