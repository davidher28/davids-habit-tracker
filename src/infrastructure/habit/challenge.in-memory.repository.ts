import { Challenge, HabitId } from '../../domain'
import { ChallengeRepository } from '../../domain/habit/challenge.repository'

export class InMemoryChallengeRepository implements ChallengeRepository {
  private challenges: Challenge[] = []

  save(challenge: Challenge): void {
    this.challenges.push(challenge)
  }

  findByHabitId(habitId: HabitId): Challenge[] {
    return this.challenges.filter(
      (challenge) => challenge.habitIdValue === habitId.value,
    )
  }
}
