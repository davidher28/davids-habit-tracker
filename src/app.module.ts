import { Module } from '@nestjs/common'
import { CreateUserController } from './application/controller/user/create-user.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './application/command'
import { RepositoryProviders } from './infrastructure/persistence'
import { QueryHandlers } from './application/query'

@Module({
  imports: [CqrsModule],
  controllers: [CreateUserController],
  providers: [...CommandHandlers, ...QueryHandlers, ...RepositoryProviders],
})
export class AppModule {}
