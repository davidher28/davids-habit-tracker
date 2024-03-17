import { CreateUserHandler } from './user/create-user.handler'
import { CreateHabitHandler } from './habit/create-habit.handler'
import { CreateProgressHandler } from './habit/create-progress.handler'
import { CreateChallengeHandler } from './challenge/create-challenge.handler'
import { CreateReminderHandler } from './habit/create-reminder.handler'
import { CancelChallengeHandler } from './challenge/cancel-challenge.handler'
import { CancelHabitHandler } from './habit/cancel-habit.handler'

export const CommandHandlers = [
  CreateUserHandler,
  CreateHabitHandler,
  CancelHabitHandler,
  CreateProgressHandler,
  CreateChallengeHandler,
  CancelChallengeHandler,
  CreateReminderHandler,
]
