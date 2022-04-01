import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompaniesModule } from 'src/companies/companies.module'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { RequestsModule } from 'src/requests/requests.module'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'
import { UsersModule } from 'src/users/users.module'
import { RequestReceiver } from './request-receiver'
import { RequestReceiverResolver } from './request-receiver.resolver'
import { RequestReceiverService } from './request-receiver.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestReceiver]),
    forwardRef(() => RequestsModule),
    UnconfirmedUsersModule,
    UsersModule,
    InvoicesModule,
    CompaniesModule,
  ],
  providers: [RequestReceiverResolver, RequestReceiverService],
  exports: [RequestReceiverModule, RequestReceiverService, TypeOrmModule],
})
export class RequestReceiverModule {}
