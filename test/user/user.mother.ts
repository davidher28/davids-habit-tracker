import { v4 as uuidv4 } from 'uuid'
import {
  User,
  UserEmail,
  UserFullName,
  UserId,
  UserName,
} from '../../src/domain'

export class UserMother {
  private id: string = uuidv4()
  private userName: string = 'userName'
  private email: string = 'email@email.com'
  private fullName: string = 'fullName'

  build(): User {
    const userId = UserId.create(this.id)
    const userName = UserName.create(this.userName)
    const email = UserEmail.create(this.email)
    const fullName = UserFullName.create(this.fullName)
    return new User(userId, userName, email, fullName)
  }

  static create(): User {
    return new UserMother().build()
  }
}
