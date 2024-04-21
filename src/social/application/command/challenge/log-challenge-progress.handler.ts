import { Inject } from '@nestjs/common'
import { EventPublisher } from '../../../domain/shared/event-publisher'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { LogChallengeProgressCommand } from './log-challenge-progress.command'

@CommandHandler(LogChallengeProgressCommand)
export class LogChallengeProgressHandler
  implements ICommandHandler<LogChallengeProgressCommand>
{
  constructor(
    @Inject(EventPublisher) private readonly eventPublisher: EventPublisher,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(command: LogChallengeProgressCommand): Promise<void> {
    // const habitId = HabitId.create(command.habitId)
    // TODO: Implement Use Case Logic
  }
}
