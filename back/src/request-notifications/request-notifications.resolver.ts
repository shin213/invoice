/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import {
  Args,
  Resolver,
  Query,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { RequestNotification } from './request-notification'
import { RequestNotificationsService } from './request-notifications.service'
import { NewRequestNotificationInput } from './dto/newRequestNotification.input'
import { RequestReceiver } from 'src/request-receiver/request-receiver'
import { User } from 'src/users/user'

@Resolver((of: unknown) => RequestNotification)
export class RequestNotificationsResolver {
  constructor(
    private requestNotificationsService: RequestNotificationsService,
  ) {}

  @Query((returns) => [RequestNotification])
  requestNotifications(): Promise<RequestNotification[]> {
    return this.requestNotificationsService.findAll()
  }

  @Query((returns) => RequestNotification)
  async getRequestNotification(
    @Args({ name: 'id', type: () => Int }) id: number,
  ) {
    const requestNotification =
      await this.requestNotificationsService.findOneById(id)
    if (!requestNotification) {
      throw new NotFoundException(id)
    }
    return requestNotification
  }

  @Mutation((returns) => RequestNotification)
  addRequestNotification(
    @Args('newRequestNotification')
    newRequestNotification: NewRequestNotificationInput,
  ): Promise<RequestNotification> {
    return this.requestNotificationsService.create(newRequestNotification)
  }

  @ResolveField('user')
  async user(
    @Parent() requestNotification: RequestNotification,
  ): Promise<User> {
    return this.requestNotificationsService.user(requestNotification.id)
  }

  @ResolveField('requestReceiver')
  async requestReceiver(
    @Parent() requestNotification: RequestNotification,
  ): Promise<RequestReceiver> {
    return this.requestNotificationsService.requestReceiver(
      requestNotification.id,
    )
  }

  @Mutation((returns) => Boolean)
  async removeRequestNotification(
    @Args({ name: 'id', type: () => Int }) id: number,
  ) {
    return this.requestNotificationsService.remove(id)
  }
}
