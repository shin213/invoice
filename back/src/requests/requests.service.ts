import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentsService } from 'src/comments/comments.service'
import { Company } from 'src/companies/company'
import { Invoice } from 'src/invoices/invoice'
import { RequestReceiverService } from 'src/request-receiver/request-receiver.service'
import { User } from 'src/users/user'
import { existsSameElement } from 'src/utils'
import { Repository } from 'typeorm'
import { NewRequestInput } from './dto/newRequest.input'
import { Request, RequestStatus } from './request'

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestsRepository: Repository<Request>,
    private requestReceiverService: RequestReceiverService,
    private commentsService: CommentsService,
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

  async create(input: NewRequestInput): Promise<Request> {
    // TODO: User が同じ Company に属していることを保証させる
    if (existsSameElement(input.request_receiver_ids)) {
      throw new HttpException(
        'has duplicate elements in request_receiver_ids',
        HttpStatus.BAD_REQUEST,
      )
    }
    if (input.request_receiver_ids.includes(input.requester_id)) {
      throw new HttpException(
        'receiver cannot be requester',
        HttpStatus.BAD_REQUEST,
      )
    }
    const data = {
      requester_id: input.requester_id,
      invoice_id: input.invoice_id,
      status: RequestStatus.requesting,
      company_id: 1,
    }
    const request = await this.requestsRepository.save(data)
    for (const receiver_id of input.request_receiver_ids) {
      await this.requestReceiverService.create({
        request_id: request.id,
        receiver_id,
      })
    }
    await this.commentsService.create({
      content: input.comment,
      invoice_id: input.invoice_id,
      user_id: input.requester_id,
      request_id: request.id,
    })
    return request
  }

  async updateStatus(id: number, status: RequestStatus) {
    await this.requestsRepository.update(id, {
      status,
    })
  }

  // async remove(id: number): Promise<boolean> {
  //   const result = await this.requestsRepository.delete(id)
  //   return result.affected > 0
  // }
}
