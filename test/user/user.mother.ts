import { User } from '../../src/domain'

export class UserMother {
  private userName: string = 'userName'
  private email: string = 'email@email.com'
  private fullName: string = 'fullName'

  build(): User {
    return User.create(this.userName, this.email, this.fullName)
  }

  static create(): User {
    return new UserMother().build()
  }
}
