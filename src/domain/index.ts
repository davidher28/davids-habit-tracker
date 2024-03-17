// -------------------- Value Objects -------------------- //
// Shared
export { UUId } from './shared/uuid'
export { InvalidUUId } from './shared/invalid-uuid'

// User
export { UserName } from './user/user.username'
export { InvalidUserNameError } from './user/invalid-user.username'
export { UserEmail } from './user/user.email'
export { InvalidUserEmailError } from './user/invalid-user.email'
export { UserFullName } from './user/user.fullname'
export { InvalidFullNameError } from './user/invalid-user.fullname'
export { UserId } from './user/user.id'

// Habit
export { HabitDescription } from './habit/habit.description'
export { InvalidHabitDescriptionError } from './habit/invalid-habit.description'
export { HabitSchedule } from './habit/habit.schedule'
export { InvalidHabitScheduleError } from './habit/invalid-habit.schedule'
export { HabitName } from './habit/habit.name'
export { InvalidHabitNameError } from './habit/invalid-habit.name'
export { HabitId } from './habit/habit.id'

// Progress
export { ProgressDate } from './habit/progress.date'
export { InvalidProgressDateError } from './habit/invalid-progress.date'
export { ProgressObservations } from './habit/progress.observations'
export { InvalidProgressObservationsError } from './habit/invalid-progress.observations'
export { ProgressId } from './habit/progress.id'

// Challenge
export { ChallengeId } from './challenge/challenge.id'

// Reminder
export { ReminderId } from './habit/reminder.id'

// -------------------- Entities -------------------- //
export { User } from './user/user'
export { Habit } from './habit/habit'
export { Progress } from './habit/progress'
export { Challenge } from './challenge/challenge'
export { Reminder } from './habit/reminder'

// -------------------- Events -------------------- //
import { ProgressCreatedHandler } from '../application/command/habit/progress-created.handler'
export const EventHandlers = [ProgressCreatedHandler]
