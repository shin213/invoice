import { Module } from '@nestjs/common'
import { RequestNotificationsService } from './request-notifications.service'
import { RequestNotificationsResolver } from './request-notifications.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestNotification } from './request-notification'

@Module({
  imports: [TypeOrmModule.forFeature([RequestNotification])],
  providers: [RequestNotificationsService, RequestNotificationsResolver],
  exports: [RequestNotificationsModule, TypeOrmModule],
})
export class RequestNotificationsModule {}
