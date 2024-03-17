import { UserRepository } from '../domain/user/user.repository'
import { InMemoryUserRepository } from './user/user.in-memory.repository'
import { HabitRepository } from '../domain/habit/habit.repository'
import { InMemoryHabitRepository } from './habit/habit.in-memory.repository'
import { WearableService } from '../domain/shared/wearable.service'
import { UserWearableService } from './user/user.wearable.service'
import { ChallengeRepository } from '../domain/challenge/challenge.repository'
import { InMemoryChallengeRepository } from './challenge/challenge.in-memory.repository'

export const RepositoryProviders = [
  { provide: UserRepository, useClass: InMemoryUserRepository },
  { provide: HabitRepository, useClass: InMemoryHabitRepository },
  { provide: ChallengeRepository, useClass: InMemoryChallengeRepository },
]

export const ServiceProviders = [
  { provide: WearableService, useClass: UserWearableService },
]
