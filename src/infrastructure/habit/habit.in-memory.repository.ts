import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit } from '../../domain'

export class InMemoryHabitRepository implements HabitRepository {
  private habits: Habit[] = []

  setHabits(habits: Habit[]): void {
    this.habits = habits
  }

  save(habit: Habit): void {
    this.habits.push(habit)
  }

  findByName(name: string): Habit | undefined {
    return this.habits.find((habit) => habit.name.equals(name))
  }

  findByUserId(userId: string): Habit[] {
    return this.habits.filter((habit) => habit.userId.equals(userId))
  }

  isExistingHabit(id: string): boolean {
    return this.habits.some((habit) => habit.id.equals(id))
  }
}
