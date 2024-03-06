import { User } from './user'

export interface UserRepository {
  save(user: User): void
  findByUserName(userName: string): User | undefined
  isExistingUser(userId: string): boolean
}

export const UserRepository = Symbol('UserRepository')
