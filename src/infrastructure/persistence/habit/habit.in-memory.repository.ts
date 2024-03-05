import { HabitRepository } from '../../../domain/habit/habit.repository'
import { Habit } from '../../../domain/habit/habit'

export class InMemoryHabitRepository implements HabitRepository {
  private habits: Habit[] = []
}
