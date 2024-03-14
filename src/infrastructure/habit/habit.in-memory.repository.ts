import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit, HabitId, HabitName, UserId } from '../../domain'

export class InMemoryHabitRepository implements HabitRepository {
  private habits: Habit[] = []

  setHabits(habits: Habit[]): void {
    this.habits = habits
  }

  save(habit: Habit): void {
    this.habits.push(habit)
  }

  findById(id: HabitId): Habit | undefined {
    return this.habits.find((habit) => habit.id.equals(id))
  }

  findByName(name: HabitName): Habit | undefined {
    return this.habits.find((habit) => habit.name.equals(name))
  }

  findByUserId(userId: UserId): Habit[] {
    return this.habits.filter((habit) => habit.userId.equals(userId))
  }

  isExistingHabit(id: HabitId): boolean {
    return this.habits.some((habit) => habit.id.equals(id))
  }
}
