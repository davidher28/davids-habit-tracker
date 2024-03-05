import { User } from '../../src/domain/user/user'
import { v4 as uuidv4 } from 'uuid'

export class UserMother {
  private id: string = uuidv4()
  private userName: string = 'userName'
  private email: string = 'email@email.com'
  private fullName: string = 'fullName'

  withId(id: string) {
    this.id = id
    return this
  }

  withUserName(userName: string) {
    this.userName = userName
    return this
  }

  withEmail(email: string) {
    this.email = email
    return this
  }

  withFullName(fullName: string) {
    this.fullName = fullName
    return this
  }

  build(): User {
    return new User(
      this.id,
      this.userName,
      this.email,
      this.fullName,
      new Date(),
      new Date(),
    )
  }

  static create(): User {
    return new UserMother().build()
  }
}
