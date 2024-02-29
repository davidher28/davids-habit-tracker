import { Module } from '@nestjs/common'
import { RegisterUserCommandHandler } from './core/application/user/register-user.command-handler'
import { CreateUserController } from './core/ui/api/create-user.controller'
import { UserRepository } from './core/domain/user/user.repository'
import { UserInMemoryRepository } from './core/infrastructure/user/user.in-memory.repository'

@Module({
  imports: [],
  controllers: [CreateUserController],
  providers: [
    RegisterUserCommandHandler,
    { provide: UserRepository, useClass: UserInMemoryRepository },
  ],
})
export class AppModule {}
