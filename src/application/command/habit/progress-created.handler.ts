import { ProgressCreatedEvent } from '../../../domain/habit/progress-created.event'
import { EventsHandler, IEventHandler } from '@nestjs/cqrs'

@EventsHandler(ProgressCreatedEvent)
export class ProgressCreatedHandler
  implements IEventHandler<ProgressCreatedEvent>
{
  handle(event: ProgressCreatedEvent) {
    // Business logic
    console.log(event)
  }
}
