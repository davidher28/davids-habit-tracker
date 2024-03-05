import { UserRepository } from '../../domain/user/user.repository'
import { InMemoryUserRepository } from './user/user.in-memory.repository'

export const RepositoryProviders = [
  { provide: UserRepository, useClass: InMemoryUserRepository },
]
