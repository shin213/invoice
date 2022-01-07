import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Company } from './company'
import { NewCompanyInput } from './dto/newCompany.input'

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private companiesRepostiory: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.companiesRepostiory.find()
  }

  findOneById(id: number): Promise<Company> {
    return this.companiesRepostiory.findOne(id)
  }

  async create(data: NewCompanyInput): Promise<Company> {
    const company = this.companiesRepostiory.create(data)
    await this.companiesRepostiory.save(company)
    return company
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.companiesRepostiory.delete(id)
    return result.affected > 0
  }
}
