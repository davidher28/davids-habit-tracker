import { ICommand } from '@nestjs/cqrs'

export class CreateUserCommand implements ICommand {
  constructor(
    readonly id: string,
    readonly userName: string,
    readonly email: string,
    readonly fullName: string,
  ) {}
}
