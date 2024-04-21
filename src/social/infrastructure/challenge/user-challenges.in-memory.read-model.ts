import { ReadModel } from '../../domain/shared/read-model'
import { DomainEvent } from '../../domain/shared/domain.event'
import { UUId } from '../../domain/shared/uuid'

export class InMemoryUserChallengesReadModel implements ReadModel {
  readonly projection: Map<string, string[]> = new Map()

  handle(id: UUId): string[] {
    return this.projection.get(id.value) || []
  }

  update(event: DomainEvent) {
    const { challengeId, users } = event.payload
    if (!Array.isArray(users)) {
      return
    }

    users.forEach((userId: string) => {
      const challenges = this.projection.get(userId) || []
      challenges.push(challengeId as string)
      this.projection.set(userId, challenges)
    })
  }
}
