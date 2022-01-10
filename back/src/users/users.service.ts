import { Injectable } from '@nestjs/common'
import { User } from './user'
import { NewUserInput } from './dto/newUser.input'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async create(data: NewUserInput): Promise<User> {
    const user = this.usersRepository.create(data)
    await this.usersRepository.save(user)
    return user
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id)
    return result.affected > 0
  }
}
