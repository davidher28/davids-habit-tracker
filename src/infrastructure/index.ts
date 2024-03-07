import { UserRepository } from '../domain/user/user.repository'
import { InMemoryUserRepository } from './user/user.in-memory.repository'
import { HabitRepository } from '../domain/habit/habit.repository'
import { InMemoryHabitRepository } from './habit/habit.in-memory.repository'
import { ProgressRepository } from '../domain/progress/progress.repository'
import { InMemoryProgressRepository } from './progress/progress.in-memory.repository'

export const RepositoryProviders = [
  { provide: UserRepository, useClass: InMemoryUserRepository },
  { provide: HabitRepository, useClass: InMemoryHabitRepository },
  { provide: ProgressRepository, useClass: InMemoryProgressRepository },
]
