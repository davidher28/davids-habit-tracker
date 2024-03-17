import { HabitRepository } from '../../domain/habit/habit.repository'
import { Habit, HabitId, HabitName, UserId } from '../../domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryHabitRepository implements HabitRepository {
  private habits: Habit[] = []

  public setHabits(habits: Habit[]): void {
    this.habits = habits
  }

  public save(habit: Habit): void {
    this.habits.push(habit)
  }

  public findById(id: HabitId): Habit | undefined {
    return this.habits.find((habit) => habit.id.equals(id))
  }

  public findByName(name: HabitName): Habit | undefined {
    return this.habits.find((habit) => habit.name.equals(name))
  }

  public findByUserId(userId: UserId): Habit[] {
    return this.habits.filter((habit) => habit.userId.equals(userId))
  }

  public isExistingHabit(id: HabitId): boolean {
    return this.habits.some((habit) => habit.id.equals(id))
  }
}
