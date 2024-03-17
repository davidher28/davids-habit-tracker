import { ProgressCreatedHandler } from '../application/command/habit/progress-created.handler'
import { ChallengeCompletedHandler } from '../application/command/challenge/challenge-completed.handler'
import { HabitCancelledHandler } from '../application/command/habit/habit-cancelled.handler'

export const EventHandlers = [
  ProgressCreatedHandler,
  ChallengeCompletedHandler,
  HabitCancelledHandler,
]
