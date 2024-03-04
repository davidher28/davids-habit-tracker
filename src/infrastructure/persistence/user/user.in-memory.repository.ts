import { User } from 'src/domain/user/user'
import { UserRepository } from '../../../domain/user/user.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  withUsers(users: User[]) {
    this.users = users
  }

  save(user: User): void {
    this.users.push(user)
  }

  findByUserName(userName: string): User | undefined {
    return this.users.find((user) => user.userName === userName)
  }

  isExistingUser(user: User): boolean {
    return this.users.some((u) => u.id === user.id)
  }
}
