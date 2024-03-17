import { ChallengeRepository } from '../../domain/challenge/challenge.repository'
import { Injectable } from '@nestjs/common'
import { Challenge } from '../../domain/challenge/challenge'
import { ChallengeId } from '../../domain/challenge/challenge.id'
import { HabitId } from '../../domain/habit/habit.id'

@Injectable()
export class InMemoryChallengeRepository implements ChallengeRepository {
  private challenges: Challenge[] = []

  public setChallenges(challenges: Challenge[]) {
    this.challenges = challenges
  }

  public save(challenge: Challenge): void {
    this.challenges.push(challenge)
  }

  public findById(id: ChallengeId): Challenge | undefined {
    return this.challenges.find((challenge) => challenge.id.equals(id))
  }

  public findByHabitId(habitId: HabitId): Challenge[] {
    return this.challenges.filter((challenge) =>
      challenge.habitId.equals(habitId),
    )
  }

  public findPendingByHabitId(habitId: HabitId): Challenge[] {
    return this.challenges.filter(
      (challenge) => challenge.isPending() && challenge.habitId.equals(habitId),
    )
  }
}
