import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'src/requests/request'
import { User } from 'src/users/user'
import { Repository } from 'typeorm'
import { NewRequestReceiverInput } from './dto/newRequestReceiver.input'
import { RequestReceiver } from './request-receiver'

@Injectable()
export class RequestReceiversService {
  constructor(
    @InjectRepository(RequestReceiver)
    private requestReceiversRepository: Repository<RequestReceiver>,
  ) {}

  findAll(): Promise<RequestReceiver[]> {
    return this.requestReceiversRepository.find()
  }

  findOneById(id: number): Promise<RequestReceiver> {
    return this.requestReceiversRepository.findOne(id)
  }

  async request(request_receiver_id: number): Promise<Request> {
    const request_receiver = await this.requestReceiversRepository.findOne(
      request_receiver_id,
      {
        relations: ['request'],
      },
    )

    return request_receiver.request
  }

  async receiver(request_receiver_id: number): Promise<User> {
    const request_receiver = await this.requestReceiversRepository.findOne(
      request_receiver_id,
      {
        relations: ['receiver'],
      },
    )

    return request_receiver.receiver
  }

  async create(data: NewRequestReceiverInput): Promise<RequestReceiver> {
    const requestReceiver = this.requestReceiversRepository.create(data)

    await this.requestReceiversRepository.save(requestReceiver)
    return requestReceiver
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.requestReceiversRepository.delete(id)
    return result.affected > 0
  }
}
