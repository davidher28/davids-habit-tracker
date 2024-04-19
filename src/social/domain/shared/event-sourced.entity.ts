import { DomainEvent } from './domain.event'

export abstract class EventSourcedEntity {
  private appliedEvents: DomainEvent[] = []
  private version: number

  protected constructor(stream?: Array<DomainEvent>) {
    this.version = 0
    if (stream) {
      stream.forEach((event) => {
        this.when(event)
      })
      this.version = stream.length
    }
  }

  protected apply(e: DomainEvent): void {
    this.appliedEvents.push(e)
    this.when(e)
  }

  protected abstract when(e: DomainEvent): void

  releaseEvents(): DomainEvent[] {
    const events = this.appliedEvents
    this.appliedEvents = []
    return events
  }
}
