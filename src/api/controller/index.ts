import { CreateUserController } from './user/create-user.controller'
import { CreateHabitController } from './habit/create-habit.controller'
import { GetHabitsController } from './habit/get-habits.controller'
import { CreateProgressController } from './habit/create-progress.controller'
import { CreateChallengeController } from './habit/create-challenge.controller'

export const Controllers = [
  CreateUserController,
  CreateHabitController,
  CreateProgressController,
  CreateChallengeController,
  GetHabitsController,
]
