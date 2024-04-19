import { DomainEvent } from './domain.event'

export interface EventPublisher {
  publishedEvents: DomainEvent[]
  publish(events: DomainEvent[]): void
  hasPublishedEvent(type: string, aggregateId: string): boolean
}

export const EventPublisher = Symbol('EventPublisher')
