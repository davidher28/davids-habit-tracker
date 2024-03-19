import { User } from './user'
import { UserName } from './user.username'
import { UserId } from './user.id'

export interface UserRepository {
  setUsers(users: User[]): void
  save(user: User): void
  findById(id: UserId): User | undefined
  findByUserName(userName: UserName): User | undefined
  isExistingUser(userId: UserId): boolean
}

export const UserRepository = Symbol('UserRepository')
