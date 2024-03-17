import { ChallengeRepository } from '../../domain/challenge/challenge.repository'
import { Challenge, ChallengeId, HabitId } from '../../domain'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryChallengeRepository implements ChallengeRepository {
  private challenges: Challenge[] = []

  public save(challenge: Challenge): void {
    this.challenges.push(challenge)
  }

  findById(id: ChallengeId): Challenge | undefined {
    return this.challenges.find((challenge) => challenge.id.equals(id))
  }

  findByHabitId(habitId: HabitId): Challenge[] {
    return this.challenges.filter((challenge) =>
      challenge.habitId.equals(habitId),
    )
  }

  findPendingByHabitId(habitId: HabitId): Challenge[] {
    return this.challenges.filter(
      (challenge) => challenge.isPending() && challenge.habitId.equals(habitId),
    )
  }
}
