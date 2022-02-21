import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RequestReceiver } from 'src/request-receiver/request-receiver'
import { User } from 'src/users/user'
import { Repository } from 'typeorm'
import { NewRequestNotificationInput } from './dto/newRequestNotification.input'
import { RequestNotification } from './request-notification'

@Injectable()
export class RequestNotificationsService {
  constructor(
    @InjectRepository(RequestNotification)
    private requestNotificationsRepository: Repository<RequestNotification>,
  ) {}

  findAll(): Promise<RequestNotification[]> {
    return this.requestNotificationsRepository.find()
  }

  findOneById(id: number): Promise<RequestNotification | undefined> {
    return this.requestNotificationsRepository.findOne(id)
  }

  async user(requestNotificationId: number): Promise<User> {
    const requestNotification =
      await this.requestNotificationsRepository.findOne(requestNotificationId, {
        relations: ['user'],
      })
    if (requestNotification == undefined) {
      throw new HttpException(
        'RequestNotification Not Found',
        HttpStatus.NOT_FOUND,
      )
    }

    return requestNotification.user
  }

  async requestReceiver(
    requestNotificationId: number,
  ): Promise<RequestReceiver> {
    const requestNotification =
      await this.requestNotificationsRepository.findOne(requestNotificationId, {
        relations: ['request_receiver'],
      })
    if (requestNotification == undefined) {
      throw new HttpException(
        'RequestNotification Not Found',
        HttpStatus.NOT_FOUND,
      )
    }

    return requestNotification.requestReceiver
  }

  async create(
    data: NewRequestNotificationInput,
  ): Promise<RequestNotification> {
    const requestNotification = this.requestNotificationsRepository.create(data)

    await this.requestNotificationsRepository.save(requestNotification)
    return requestNotification
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.requestNotificationsRepository.delete(id)
    const affected = result.affected
    return !!affected && affected > 0
  }
}
