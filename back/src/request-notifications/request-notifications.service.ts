import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { RequestReceiver } from 'src/request-receiver/request-receiver'
import { RequestReceiversService } from 'src/request-receiver/request-receiver.service'
import { User } from 'src/users/user'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { NewRequestNotificationInput } from './dto/newRequestNotification.input'
import { RequestNotification } from './request-notification'

@Injectable()
export class RequestNotificationsService {
  constructor(
    @InjectRepository(RequestNotification)
    private requestNotificationsRepository: Repository<RequestNotification>,
    private requestReceiversService: RequestReceiversService,
    private usersServive: UsersService,
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

    request_notification.user = await this.usersServive.findOneById(
      data.user_id,
    )
    request_notification.request_receiver =
      await this.requestReceiversService.findOneById(data.request_receiver_id)

    await this.requestNotificationsRepository.save(request_notification)
    return request_notification
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.requestNotificationsRepository.delete(id)
    return result.affected > 0
  }
}
