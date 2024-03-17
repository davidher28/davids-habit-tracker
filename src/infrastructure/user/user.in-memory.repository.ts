import { User } from 'src/domain/user/user'
import { UserRepository } from '../../domain/user/user.repository'
import { Injectable } from '@nestjs/common'
import { UserId, UserName } from '../../domain'

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  public setUsers(users: User[]) {
    this.users = users
  }

  public save(user: User): void {
    this.users.push(user)
  }

  public findByUserName(userName: UserName): User | undefined {
    return this.users.find((user) => user.userName.equals(userName))
  }

  public isExistingUser(userId: UserId): boolean {
    return this.users.some((user) => user.id.equals(userId))
  }
}
