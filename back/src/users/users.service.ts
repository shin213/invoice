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
    private companyService: CompaniesService,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne(id)
  }

  // findByCompany(company_id: number): Promise<User[]> {
  //   return this.usersRepository.find({
  //     company_id,
  //   })
  // }

  async company(company_id: number): Promise<Company> {
    return await this.companyService.findOneById(company_id)
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
