import { Injectable } from '@nestjs/common'
import { Company } from './company'
import { NewCompanyInput } from './dto/newCompany.input'

let companies: Company[] = [
  {
    id: 1,
    name: 'Joe',
  },
  {
    id: 2,
    name: 'Maria',
  },
  {
    id: 3,
    name: 'Smith',
  },
]

@Injectable()
export class CompaniesService {
  findAll(): Promise<Company[]> {
    return Promise.resolve(companies)
  }

  findOneById(id: number): Promise<Company> {
    const company = companies.find((company) => company.id === id)
    return Promise.resolve(company)
  }

  create(data: NewCompanyInput): Promise<Company> {
    const company: Company = {
      ...data,
      id: Date.now(),
    }
    companies.push(company)

    return Promise.resolve(company)
  }

  async remove(id: number): Promise<boolean> {
    companies = companies.filter((company) => company.id !== id)
    return true
  }
}
