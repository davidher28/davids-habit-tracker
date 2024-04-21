import { DomainEvent } from './domain.event'
import { UUId } from './uuid'

export interface EventPublisher {
  publishedEvents: DomainEvent[]
  publish(events: DomainEvent[]): void
  hasPublishedEvent(aggregateId: UUId, type: string): boolean
  findByAggregateId(id: UUId): DomainEvent[]
}

export const EventPublisher = Symbol('EventPublisher')
