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

  findByInvoiceId(invoiceId: string): Promise<Request[]> {
    return this.requestsRepository.find({
      where: {
        invoiceId,
      },
      order: {
        createdAt: 'DESC',
      },
    })
  }

  findOneById(id: number): Promise<Request | undefined> {
    return this.requestsRepository.findOne(id)
  }

  async requester(requestId: number): Promise<User> {
    const request = await this.requestsRepository.findOne(requestId, {
      relations: ['requester'],
    })
    if (request == undefined) {
      throw new HttpException('Request Not Found', HttpStatus.NOT_FOUND)
    }

    return request.requester
  }

  async receivers(request: Request): Promise<User[]> {
    // TODO: N+1問題
    const requestReceivers = await request.requestReceivers
    return await Promise.all(
      requestReceivers.map((requestReceiver) =>
        this.requestReceiverService.receiver(requestReceiver.id),
      ),
    )
  }

  async invoice(requestId: number): Promise<Invoice> {
    const request = await this.requestsRepository.findOne(requestId, {
      relations: ['invoice'],
    })
    if (request == undefined) {
      throw new HttpException('Request Not Found', HttpStatus.NOT_FOUND)
    }

    return request.invoice
  }

  async company(requestId: number): Promise<Company> {
    const request = await this.requestsRepository.findOne(requestId, {
      relations: ['company'],
    })
    if (request == undefined) {
      throw new HttpException('Request Not Found', HttpStatus.NOT_FOUND)
    }

    return request.company
  }

  async create(input: NewRequestInput): Promise<Request> {
    // TODO: User が同じ Company に属していることを保証させる
    if (existsSameElement(input.requestReceiverIds)) {
      throw new HttpException(
        'has duplicate elements in requestReceiverIds',
        HttpStatus.BAD_REQUEST,
      )
    }
    if (input.requestReceiverIds.includes(input.requesterId)) {
      throw new HttpException(
        'receiver cannot be requester',
        HttpStatus.BAD_REQUEST,
      )
    }
    const data = {
      requesterId: input.requesterId,
      invoiceId: input.invoiceId,
      status: RequestStatus.awaiting,
      companyId: 1,
    }
    const request = await this.requestsRepository.save(data)
    for (const receiverId of input.requestReceiverIds) {
      await this.requestReceiverService.create({
        requestId: request.id,
        receiverId,
      })
    }
    await this.commentsService.create({
      content: input.comment,
      invoiceId: input.invoiceId,
      userId: input.requesterId,
      requestId: request.id,
    })
    return request
  }

  async updateStatus(id: number, status: RequestStatus) {
    return await this.requestsRepository.update(id, {
      status,
    })
  }

  // async remove(id: number): Promise<boolean> {
  //   const result = await this.requestsRepository.delete(id)
  //   const affected = result.affected
  // return affected != null && affected > 0
  // }
}
