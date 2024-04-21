import { ReadModel } from '../../domain/shared/read-model'
import { DomainEvent } from '../../domain/shared/domain.event'
import { UUId } from '../../domain/shared/uuid'

export class InMemoryHabitChallengesReadModel implements ReadModel {
  readonly projection: Map<string, string[]> = new Map()

  handle(id: UUId): string[] {
    return this.projection.get(id.value) || []
  }

  update(event: DomainEvent) {
    const { challengeId, habitId } = event.payload
    const challengeIds = this.projection.get(<string>habitId) || []
    challengeIds.push(<string>challengeId)
    this.projection.set(<string>habitId, challengeIds)
  }
}
