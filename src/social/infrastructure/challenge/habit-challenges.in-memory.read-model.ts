import { ReadModel } from '../../domain/shared/read-model'
import { DomainEvent } from '../../domain/shared/domain.event'

export class InMemoryHabitChallengesReadModel implements ReadModel {
  handle(event: DomainEvent) {
    console.log(event.payload)
  }
}
