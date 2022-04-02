/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, UseGuards } from '@nestjs/common'
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
import { AdminAuthorizerGuard } from 'src/aws/admin-authorizer/admin-authorizer.guard'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthUser } from 'src/aws/cognito/cognito'

@Resolver((of: unknown) => RequestNotification)
export class RequestNotificationsResolver {
  constructor(
    private requestNotificationsService: RequestNotificationsService,
  ) {}

  @UseGuards(AuthorizerGuard)
  @Query((returns) => [RequestNotification])
  requestNotifications(
    @CurrentUser() user: AuthUser,
  ): Promise<RequestNotification[]> {
    return this.requestNotificationsService.findByUser(user.dbUser.id)
  }

  // @UseGuards(AdminAuthorizerGuard)
  // @Query((returns) => RequestNotification)
  // async getRequestNotification(
  //   @Args({ name: 'id', type: () => Int }) id: number,
  // ) {
  //   const requestNotification =
  //     await this.requestNotificationsService.findOneById(id)
  //   if (!requestNotification) {
  //     throw new NotFoundException(id)
  //   }
  //   return requestNotification
  // }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => RequestNotification)
  addRequestNotification(
    @CurrentUser() user: AuthUser,
    @Args('newRequestNotification')
    newRequestNotification: NewRequestNotificationInput,
  ): Promise<RequestNotification> {
    // TODO: check companyId
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

  // @UseGuards(AdminAuthorizerGuard)
  // @Mutation((returns) => Boolean)
  // async removeRequestNotification(
  //   @Args({ name: 'id', type: () => Int }) id: number,
  // ) {
  //   return this.requestNotificationsService.remove(id)
  // }
}
