import { UserRepository } from '../../domain/user/user.repository'
import { Injectable } from '@nestjs/common'
import { UserId } from '../../domain/user/user.id'
import { UserName } from '../../domain/user/user.username'
import { User } from '../../domain/user/user'

@Injectable()
export class InMemoryUserRepository implements UserRepository {
  private users: User[] = []

  public setUsers(users: User[]) {
    this.users = users
  }

  public save(user: User): void {
    this.users.push(user)
  }

  public findById(id: UserId): User | undefined {
    return this.users.find((user) => user.id.equals(id))
  }

  public findByUserName(userName: UserName): User | undefined {
    return this.users.find((user) => user.userName.equals(userName))
  }

  public isExistingUser(userId: UserId): boolean {
    return this.users.some((user) => user.id.equals(userId))
  }
}
