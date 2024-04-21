import { DomainEvent } from './domain.event'
import { UUId } from './uuid'
import { EventHandler } from '../../infrastructure/shared/event-publisher.in-memory'

export interface EventPublisher {
  publishedEvents: DomainEvent[]
  publish(events: DomainEvent[]): void
  registerHandler(handler: EventHandler, type: string): void
  hasPublishedEvent(aggregateId: UUId, type: string): boolean
  findByAggregateId(id: UUId): DomainEvent[]
}

export const EventPublisher = Symbol('EventPublisher')
