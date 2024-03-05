import { Module } from '@nestjs/common'
import { CqrsModule } from '@nestjs/cqrs'
import { CommandHandlers } from './application/command'
import { RepositoryProviders } from './infrastructure/persistence'
import { QueryHandlers } from './application/query'
import { ApplicationControllers } from './application/controller'

@Module({
  imports: [CqrsModule],
  controllers: [...ApplicationControllers],
  providers: [...CommandHandlers, ...QueryHandlers, ...RepositoryProviders],
})
export class AppModule {}
