import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user'
import { NewUserInput } from './dto/newUser.input'
import { Company } from 'src/companies/company'

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

  async company(userId: number): Promise<Company> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['company'],
    })

    return user.company
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
