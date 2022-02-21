import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Request } from 'src/requests/request'
import { User } from 'src/users/user'
import { Repository } from 'typeorm'
import { NewRequestReceiverInput } from './dto/newRequestReceiver.input'
import { RequestReceiver } from './request-receiver'

@Injectable()
export class RequestReceiverService {
  constructor(
    @InjectRepository(RequestReceiver)
    private requestReceiversRepository: Repository<RequestReceiver>,
  ) {}

  findAll(): Promise<RequestReceiver[]> {
    return this.requestReceiversRepository.find()
  }

  findOneById(id: number): Promise<RequestReceiver | undefined> {
    return this.requestReceiversRepository.findOne(id)
  }

  async request(requestReceiverId: number): Promise<Request> {
    const requestReceiver = await this.requestReceiversRepository.findOne(
      requestReceiverId,
      {
        relations: ['request'],
      },
    )
    if (requestReceiver == undefined) {
      throw new HttpException('RequestReceiver Not Found', HttpStatus.NOT_FOUND)
    }

    return requestReceiver.request
  }

  async receiver(requestReceiverId: number): Promise<User> {
    const requestReceiver = await this.requestReceiversRepository.findOne(
      requestReceiverId,
      {
        relations: ['receiver'],
      },
    )
    if (requestReceiver == undefined) {
      throw new HttpException('RequestReceiver Not Found', HttpStatus.NOT_FOUND)
    }

    return requestReceiver.receiver
  }

  async create(data: NewRequestReceiverInput): Promise<RequestReceiver> {
    const requestReceiver = this.requestReceiversRepository.create(data)

    await this.requestReceiversRepository.save(requestReceiver)
    return requestReceiver
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.requestReceiversRepository.delete(id)
    const affected = result.affected
    return !!affected && affected > 0
  }
}
