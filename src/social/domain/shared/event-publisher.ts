import { DomainEvent } from './domain.event'

export interface EventPublisher {
  publish(events: DomainEvent[]): void
}

export const EventPublisher = Symbol('EventPublisher')
