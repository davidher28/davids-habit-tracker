import { UserName } from './user.username'
import { UserId } from './user.id'
import { UserEmail } from './user.email'
import { UserFullName } from './user.fullname'
import { UUId } from '../shared/uuid'
import { AggregateRoot } from '@nestjs/cqrs'
import { Achievement } from './achievement'

export class User extends AggregateRoot {
  private readonly createdAt: Date
  private updatedAt: Date

  readonly achievements: Achievement[] = []

  private constructor(
    readonly id: UserId,
    readonly userName: UserName,
    readonly email: UserEmail,
    readonly fullName: UserFullName,
  ) {
    super()
    this.autoCommit = true
    this.id = id
    this.userName = userName
    this.email = email
    this.fullName = fullName
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  public static create(
    userName: string,
    email: string,
    fullName: string,
  ): User {
    const uuid = UUId.generate()
    const userId = UserId.create(uuid)

    return new User(
      userId,
      UserName.create(userName),
      UserEmail.create(email),
      UserFullName.create(fullName),
    )
  }

  get idValue(): string {
    return this.id.value
  }

  get userNameValue(): string {
    return this.userName.value
  }

  get emailValue(): string {
    return this.email.value
  }

  get fullNameValue(): string {
    return this.fullName.value
  }

  public addAchievement(
    challengeId: string,
    userId: string,
    achievementDate: Date,
  ): void {
    const achievement = Achievement.create(challengeId, userId, achievementDate)
    this.achievements.push(achievement)
  }
}
