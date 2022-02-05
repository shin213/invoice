import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from 'src/companies/company'
import { Invoice } from 'src/invoices/invoice'
import { User } from 'src/users/user'
import { Repository } from 'typeorm'
import { NewRequestInput } from './dto/newRequest.input'
import { Request, RequestStatus } from './request'

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
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
    const request = await this.requestsRepository.save({
      ...data,
      status: RequestStatus.requesting,
      company_id: 1,
    })
    return request
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.requestsRepository.delete(id)
    return result.affected > 0
  }
}
