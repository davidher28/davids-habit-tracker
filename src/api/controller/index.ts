import { CreateUserController } from './user/create-user.controller'
import { CreateHabitController } from './habit/create-habit.controller'
import { GetHabitsController } from './habit/get-habits.controller'
import { CreateProgressController } from './habit/create-progress.controller'
import { CreateChallengeController } from './challenge/create-challenge.controller'
import { CreateReminderController } from './habit/create-reminder.controller'
import { CancelChallengeController } from './challenge/cancel-challenge.controller'

export const Controllers = [
  CreateUserController,
  CreateHabitController,
  CreateProgressController,
  CreateChallengeController,
  CancelChallengeController,
  CreateReminderController,
  GetHabitsController,
]
