import { Module } from '@nestjs/common'
import { RequestNotificationsService } from './request-notifications.service'
import { RequestNotificationsResolver } from './request-notifications.resolver'

@Module({
  providers: [RequestNotificationsService, RequestNotificationsResolver],
})
export class RequestNotificationsModule {}
