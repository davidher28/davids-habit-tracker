import { CreateUserController } from './user/create-user.controller'
import { CreateHabitController } from './habit/create-habit.controller'
import { GetHabitsController } from './habit/get-habits.controller'
import { CreateProgressController } from './progress/create-progress.controller'

export const ApplicationControllers = [
  CreateUserController,
  CreateHabitController,
  CreateProgressController,
  GetHabitsController,
]
