import { Injectable } from '@nestjs/common'
import { User } from './user'
import { NewUserInput } from './dto/newUser.input'

let users: User[] = [
  {
    id: 1,
    email: 'a@example.com',
    name: 'Joe',
    isAdmin: 0,
    createdAt: new Date(),
  },
  {
    id: 2,
    email: 'b@example.com',
    name: 'Maria',
    isAdmin: 0,
    createdAt: new Date(),
  },
  {
    id: 3,
    email: 'c@example.com',
    name: 'Smith',
    isAdmin: 0,
    createdAt: new Date(),
  },
]

@Injectable()
export class UsersService {
  findAll(): Promise<User[]> {
    return Promise.resolve(users)
  }

  findOneById(id: number): Promise<User> {
    const user = users.find((user) => user.id === id)
    return Promise.resolve(user)
  }

  create(data: NewUserInput): Promise<User> {
    const user: User = {
      ...data,
      id: Date.now(),
      isAdmin: 0,
      createdAt: new Date(),
    }
    users.push(user)

    return Promise.resolve(user)
  }

  async remove(id: number): Promise<boolean> {
    users = users.filter((user) => user.id !== id)
    return true
  }
}
