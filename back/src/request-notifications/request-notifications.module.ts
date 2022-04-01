import { Module } from '@nestjs/common'
import { RequestNotificationsService } from './request-notifications.service'
import { RequestNotificationsResolver } from './request-notifications.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestNotification } from './request-notification'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { UsersModule } from 'src/users/users.module'
import { RequestsModule } from 'src/requests/requests.module'
import { CompaniesModule } from 'src/companies/companies.module'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { CommentsModule } from 'src/comments/comments.module'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestNotification]),
    RequestReceiverModule,
    UnconfirmedUsersModule,
    UsersModule,
    CommentsModule,
    RequestsModule,
    CompaniesModule,
    InvoicesModule,
  ],
  providers: [RequestNotificationsService, RequestNotificationsResolver],
  exports: [
    RequestNotificationsModule,
    RequestNotificationsService,
    TypeOrmModule,
  ],
})
export class RequestNotificationsModule {}
