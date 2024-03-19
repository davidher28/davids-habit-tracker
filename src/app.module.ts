import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './core/application/command'
import { RepositoryProviders, ServiceProviders } from './core/infrastructure'
import { QueryHandlers } from './core/application/query'
import { Controllers } from './core/api'
import { EventHandlers } from './core/domain'

@Module({
  imports: [CqrsModule],
  controllers: [...Controllers],
  providers: [
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
    ...RepositoryProviders,
    ...ServiceProviders,
  ],
})
export class AppModule {}
