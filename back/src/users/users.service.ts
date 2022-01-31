import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user'
import { NewUserInput } from './dto/newUser.input'
import { Company } from 'src/companies/company'
import { CompaniesService } from 'src/companies/companies.service'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private companiesService: CompaniesService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  async company(user_id: number): Promise<Company> {
    const user = await this.usersRepository.findOne(user_id, {
      relations: ['company'],
    })

    return user.company
  }

  async create(data: NewUserInput): Promise<User> {
    console.log('>>> ', data.company_id)
    const user = this.usersRepository.create(data)
    user.company = await this.companiesService.findOneById(data.company_id)
    await this.usersRepository.save(user)
    return user
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id)
    return result.affected > 0
  }
}
