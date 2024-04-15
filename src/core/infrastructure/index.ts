import { UserRepository } from '../domain/user/user.repository'
import { InMemoryUserRepository } from './user/user.in-memory.repository'
import { HabitRepository as CoreHabitRepository } from '../domain/habit/habit.repository'
import { HabitRepository as SocialHabitRepository } from '../../social/domain/habit/habit.repository'
import { InMemoryHabitRepository } from './habit/habit.in-memory.repository'
import { WearableService } from '../domain/shared/wearable.service'
import { UserWearableService } from './user/user.wearable.service'
import { ChallengeRepository } from '../domain/challenge/challenge.repository'
import { InMemoryChallengeRepository } from './challenge/challenge.in-memory.repository'

export const RepositoryProviders = [
  { provide: UserRepository, useClass: InMemoryUserRepository },
  { provide: CoreHabitRepository, useClass: InMemoryHabitRepository },
  { provide: SocialHabitRepository, useClass: InMemoryHabitRepository },
  { provide: ChallengeRepository, useClass: InMemoryChallengeRepository },
]

export const ServiceProviders = [
  { provide: WearableService, useClass: UserWearableService },
]
