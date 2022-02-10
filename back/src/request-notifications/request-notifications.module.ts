import { Module } from '@nestjs/common'
import { RequestNotificationsService } from './request-notifications.service'
import { RequestNotificationsResolver } from './request-notifications.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RequestNotification } from './request-notification'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { RequestReceiverService } from 'src/request-receiver/request-receiver.service'
import { UsersService } from 'src/users/users.service'
import { UsersModule } from 'src/users/users.module'
import { RequestsModule } from 'src/requests/requests.module'
import { RequestsService } from 'src/requests/requests.service'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { InvoicesService } from 'src/invoices/invoices.service'
import { CommentsModule } from 'src/comments/comments.module'
import { CommentsService } from 'src/comments/comments.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestNotification]),
    RequestReceiverModule,
    UsersModule,
    CommentsModule,
    RequestsModule,
    CompaniesModule,
    InvoicesModule,
  ],
  providers: [
    RequestNotificationsService,
    RequestNotificationsResolver,
    RequestReceiverService,
    UsersService,
    CommentsService,
    RequestsService,
    CompaniesService,
    InvoicesService,
  ],
  exports: [RequestNotificationsModule, TypeOrmModule],
})
export class RequestNotificationsModule {}
