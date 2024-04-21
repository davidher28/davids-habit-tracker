import { ReadModel } from '../../domain/shared/read-model'
import { DomainEvent } from '../../domain/shared/domain.event'
import { UUId } from '../../domain/shared/uuid'

export class InMemoryUserChallengesReadModel implements ReadModel {
  handle(id: UUId): string[] {
    console.log(id)
    return []
  }

  update(event: DomainEvent) {
    console.log(event.payload)
  }
}
