import { DomainEvent } from '../domain/shared/domain.event'
import { EventPublisher } from '../domain/shared/event-publisher'
import { UUId } from '../domain/shared/uuid'

export class InMemoryEventPublisher implements EventPublisher {
  publishedEvents: DomainEvent[] = []

  publish(events: DomainEvent[]): void {
    this.publishedEvents = [...this.publishedEvents, ...events]
  }

  hasPublishedEvent(type: string, aggregateId: string): boolean {
    return this.publishedEvents.some(
      (event) => event.type === type && event.aggregateId.value === aggregateId,
    )
  }

  findByAggregateId(id: UUId): DomainEvent[] {
    return this.publishedEvents.filter((event) => event.aggregateId.equals(id))
  }
}
