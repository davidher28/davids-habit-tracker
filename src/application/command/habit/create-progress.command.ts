import { ICommand } from '@nestjs/cqrs'

export class CreateProgressCommand implements ICommand {
  constructor(
    readonly habitId: string,
    readonly progressDate: Date,
    readonly observations?: string,
  ) {}
}
