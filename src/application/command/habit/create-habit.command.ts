import { ICommand } from '@nestjs/cqrs'

export class CreateHabitCommand implements ICommand {
  constructor(
    readonly habitId: string,
    readonly name: string,
    readonly description: string,
  ) {}
}
