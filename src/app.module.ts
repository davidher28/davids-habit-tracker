import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './application/command'
import { RepositoryProviders } from './infrastructure'
import { QueryHandlers } from './application/query'
import { Controllers } from './api/controller'
import { EventHandlers } from './domain'

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ...RepositoryProviders,
  ],
})
export class AppModule {}
