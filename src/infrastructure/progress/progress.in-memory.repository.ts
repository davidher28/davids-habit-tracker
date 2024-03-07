import { Progress } from '../../domain'

export class InMemoryProgressRepository {
  private progress: Progress[] = []
}
