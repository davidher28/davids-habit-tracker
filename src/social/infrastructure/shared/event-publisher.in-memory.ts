import { DomainEvent } from '../../domain/shared/domain.event'
import { EventPublisher } from '../../domain/shared/event-publisher'
import { UUId } from '../../domain/shared/uuid'

export type EventHandler = (event: DomainEvent) => void

export class InMemoryEventPublisher implements EventPublisher {
  publishedEvents: DomainEvent[] = []
  eventHandlers: { [key: string]: EventHandler[] } = {}

  publish(events: DomainEvent[]): void {
    this.publishedEvents = [...this.publishedEvents, ...events]
    events.forEach((event) => {
      const handlers = this.eventHandlers[event.type] || []
      handlers.forEach((handler) => handler(event))
    })
  }

  registerHandler(handler: EventHandler, type: string): void {
    this.eventHandlers[type] = this.eventHandlers[type] || []
    this.eventHandlers[type].push(handler)
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
