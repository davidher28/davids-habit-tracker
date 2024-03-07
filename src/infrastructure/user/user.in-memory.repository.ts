import { User } from 'src/domain/user/user'
import { UserRepository } from '../../domain/user/user.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  setUsers(users: User[]) {
    this.users = users
  }

  save(user: User): void {
    this.users.push(user)
  }

  findByUserName(userName: string): User | undefined {
    return this.users.find((user) => user.userNameValue === userName)
  }

  isExistingUser(userId: string): boolean {
    return this.users.some((user) => user.idValue === userId)
  }
}
