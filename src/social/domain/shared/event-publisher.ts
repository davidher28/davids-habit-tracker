import { DomainEvent } from './domain.event'
import { UUId } from './uuid'

export interface EventPublisher {
  publishedEvents: DomainEvent[]
  publish(events: DomainEvent[]): void
  hasPublishedEvent(type: string, aggregateId: string): boolean
  findByAggregateId(id: UUId): DomainEvent[]
}

export const EventPublisher = Symbol('EventPublisher')
