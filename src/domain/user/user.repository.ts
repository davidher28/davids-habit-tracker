import { User } from './user'

export interface UserRepository {
  save(user: User): void
  findByUserName(userName: string): User | undefined
  isExistingUser(user: User): boolean
}

export const UserRepository = Symbol('UserRepository')
