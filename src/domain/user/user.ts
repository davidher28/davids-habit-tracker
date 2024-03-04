import { AggregateRoot } from '@nestjs/cqrs'

export class User extends AggregateRoot {
  constructor(
    readonly id: string,
    readonly userName: string,
    readonly fullName: string,
  ) {
    super()
  }
}
