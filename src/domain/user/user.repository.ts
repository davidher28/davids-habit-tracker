import { User } from './user'

export interface UserRepository {
  setUsers(users: User[]): void
  save(user: User): void
  findByUserName(userName: string): User | undefined
  isExistingUser(userId: string): boolean
}

export const UserRepository = Symbol('UserRepository')
