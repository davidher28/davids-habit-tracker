import { EventSourcedEntity } from '../event-sourced.entity'
import { DomainEvent } from '../domain.event'

export class Challenge extends EventSourcedEntity {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected when(e: DomainEvent): void {
    // TODO: Implement the event handler
  }
}
