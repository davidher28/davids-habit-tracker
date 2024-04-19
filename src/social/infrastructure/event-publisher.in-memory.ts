import { DomainEvent } from '../domain/shared/domain.event'
import { EventPublisher } from '../domain/shared/event-publisher'

export class InMemoryEventPublisher implements EventPublisher {
  publishedEvents: DomainEvent[] = []

  publish(events: DomainEvent[]): void {
    events.forEach((event) => {
      this.publishedEvents.push(event)
    })
  }

  hasPublishedEvent(type: string, aggregateId: string): boolean {
    return this.publishedEvents.some((event) => {
      return event.type === type && event.aggregateId.value === aggregateId
    })
  }
}
