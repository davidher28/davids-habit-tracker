import { CreateUserHandler } from './user/create-user.handler'
import { CreateHabitHandler } from './habit/create-habit.handler'
import { CreateProgressHandler } from './habit/create-progress.handler'
import { CreateChallengeHandler } from './habit/create-challenge.handler'

export const CommandHandlers = [
  CreateUserHandler,
  CreateHabitHandler,
  CreateProgressHandler,
  CreateChallengeHandler,
]
