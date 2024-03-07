import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit } from '../../domain/habit/habit'

export class InMemoryHabitRepository implements HabitRepository {
  private habits: Habit[] = []

  setHabits(habits: Habit[]): void {
    this.habits = habits
  }

  save(habit: Habit): void {
    this.habits.push(habit)
  }

  findById(id: string): Habit | undefined {
    return this.habits.find((habit) => habit.idValue === id)
  }

  findByName(name: string): Habit | undefined {
    return this.habits.find((habit) => habit.nameValue === name)
  }

  findByUserId(userId: string): Habit[] {
    return this.habits.filter((habit) => habit.userIdValue === userId)
  }
}
