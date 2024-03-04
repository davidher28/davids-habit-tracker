import { Module } from '@nestjs/common'
import { CreateUserHandler } from './application/command/user/create-user.handler'
import { UserController } from './api/user.controller'
import { UserRepository } from './domain/user/user.repository'
import { InMemoryUserRepository } from './infrastructure/persistence/user/user.in-memory.repository'
import { CqrsModule } from '@nestjs/cqrs'

const CommandHandlers = [CreateUserHandler]
const QueryHandlers = []
const Repositories = [
  { provide: UserRepository, useClass: InMemoryUserRepository },
]

@Module({
  imports: [CqrsModule],
  controllers: [UserController],
  providers: [...CommandHandlers, ...QueryHandlers, ...Repositories],
})
export class AppModule {}
