import { UserName } from './user.username'
import { UserId } from './user.id'
import { UserEmail } from './user.email'
import { UserFullName } from './user.fullname'

export class User {
  readonly id: UserId
  readonly userName: UserName
  email: UserEmail
  readonly fullName: UserFullName
  readonly createdAt: Date
  updatedAt: Date

  constructor(
    id: UserId,
    userName: UserName,
    email: UserEmail,
    fullName: UserFullName,
  ) {
    this.id = id
    this.userName = userName
    this.email = email
    this.fullName = fullName
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  static create(
    id: UserId,
    userName: UserName,
    email: UserEmail,
    fullName: UserFullName,
  ): User {
    return new User(id, userName, email, fullName)
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
}
