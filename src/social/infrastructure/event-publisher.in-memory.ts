import { DomainEvent } from '../domain/shared/domain.event'
import { EventPublisher } from '../domain/shared/event-publisher'
import { UUId } from '../domain/shared/uuid'

export class InMemoryEventPublisher implements EventPublisher {
  publishedEvents: DomainEvent[] = []

  publish(events: DomainEvent[]): void {
    this.publishedEvents = [...this.publishedEvents, ...events]
  }

  hasPublishedEvent(aggregateId: UUId, type: string): boolean {
    return this.publishedEvents.some(
      (event) => event.type === type && event.aggregateId.equals(aggregateId),
    )
  }

  findByAggregateId(aggregateId: UUId): DomainEvent[] {
    return this.publishedEvents.filter((event) =>
      event.aggregateId.equals(aggregateId),
    )
  }
}
