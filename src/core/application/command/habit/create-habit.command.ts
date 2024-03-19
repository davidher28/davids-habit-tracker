import { ICommand } from '@nestjs/cqrs'

export class CreateHabitCommand implements ICommand {
  constructor(
    readonly name: string,
    readonly description: string,
    readonly frequency: string,
    readonly duration: number,
    readonly restTime: number,
    readonly userId: string,
    readonly wearableDeviceId?: string,
  ) {}
}
