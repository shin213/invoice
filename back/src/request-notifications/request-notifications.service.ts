import { Injectable } from '@nestjs/common'
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

  findOneById(id: number): Promise<RequestNotification> {
    return this.requestNotificationsRepository.findOne(id)
  }

  async user(request_notification_id: number): Promise<User> {
    const requestNotification =
      await this.requestNotificationsRepository.findOne(
        request_notification_id,
        {
          relations: ['user'],
        },
      )

    return requestNotification.user
  }

  async request_receiver(
    request_notification_id: number,
  ): Promise<RequestReceiver> {
    const requestNotification =
      await this.requestNotificationsRepository.findOne(
        request_notification_id,
        {
          relations: ['request_receiver'],
        },
      )

    return requestNotification.request_receiver
  }

  async create(
    data: NewRequestNotificationInput,
  ): Promise<RequestNotification> {
    const request_notification =
      this.requestNotificationsRepository.create(data)

    await this.requestNotificationsRepository.save(request_notification)
    return request_notification
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.requestNotificationsRepository.delete(id)
    return result.affected > 0
  }
}
