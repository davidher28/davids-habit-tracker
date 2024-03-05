import { AggregateRoot } from '@nestjs/cqrs'

export class User extends AggregateRoot {
  constructor(
    readonly id: string,
    readonly userName: string,
    readonly email: string,
    readonly fullName: string,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    super()
  }
}
