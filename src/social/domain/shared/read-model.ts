import { DomainEvent } from './domain.event'
import { UUId } from './uuid'

export interface ReadModel {
  handle(id: UUId): string[]
  update(event: DomainEvent): void
}

export const ReadModel = Symbol('ReadModel')
