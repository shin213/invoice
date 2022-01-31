import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CompaniesService } from 'src/companies/companies.service'
import { Company } from 'src/companies/company'
import { Invoice } from 'src/invoices/invoice'
import { InvoicesService } from 'src/invoices/invoices.service'
import { User } from 'src/users/user'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { NewRequestInput } from './dto/newRequest.input'
import { Request } from './request'

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    private usersService: UsersService,
    private invoicesService: InvoicesService,
    private companiesService: CompaniesService,
  ) {}

  findAll(): Promise<Request[]> {
    return this.requestsRepository.find()
  }

  findOneById(id: number): Promise<Request> {
    return this.requestsRepository.findOne(id)
  }

  async requester(request_id: number): Promise<User> {
    const request = await this.requestsRepository.findOne(request_id, {
      relations: ['requester'],
    })

    return request.requester
  }

  async invoice(request_id: number): Promise<Invoice> {
    const request = await this.requestsRepository.findOne(request_id, {
      relations: ['invoice'],
    })

    return request.invoice
  }

  async company(request_id: number): Promise<Company> {
    const request = await this.requestsRepository.findOne(request_id, {
      relations: ['company'],
    })

    return request.company
  }

  async create(data: NewRequestInput): Promise<Request> {
    const request = this.requestsRepository.create(data)

    request.requester = await this.usersService.findOneById(data.requester_id)
    request.invoice = await this.invoicesService.findOneById(data.invoice_id)
    request.company = await this.companiesService.findOneById(data.company_id)

    await this.requestsRepository.save(request)
    return request
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.requestsRepository.delete(id)
    return result.affected > 0
  }
}
