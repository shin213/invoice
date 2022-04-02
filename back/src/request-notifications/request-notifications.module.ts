import { Module } from '@nestjs/common'
import { RequestNotificationsService } from './request-notifications.service'
import { RequestNotificationsResolver } from './request-notifications.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestNotification } from './request-notification'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestNotification]),
    RequestReceiverModule,
    CognitoModule,
  ],
  providers: [RequestNotificationsService, RequestNotificationsResolver],
  exports: [
    RequestNotificationsModule,
    RequestNotificationsService,
    TypeOrmModule,
  ],
})
export class RequestNotificationsModule {}
