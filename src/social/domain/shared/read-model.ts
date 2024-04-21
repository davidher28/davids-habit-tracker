import { DomainEvent } from './domain.event'

export interface ReadModel {
  handle(event: DomainEvent): void
}

export const ReadModel = Symbol('ReadModel')
