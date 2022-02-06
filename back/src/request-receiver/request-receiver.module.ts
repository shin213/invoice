import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { InvoicesService } from 'src/invoices/invoices.service'
import { RequestsModule } from 'src/requests/requests.module'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { RequestReceiver } from './request-receiver'
import { RequestReceiverResolver } from './request-receiver.resolver'
import { RequestReceiverService } from './request-receiver.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestReceiver]),
    forwardRef(() => RequestsModule),
    UsersModule,
    InvoicesModule,
    CompaniesModule,
  ],
  providers: [
    RequestReceiverResolver,
    RequestReceiverService,
    UsersService,
    InvoicesService,
    CompaniesService,
  ],
  exports: [RequestReceiverModule, TypeOrmModule],
})
export class RequestReceiverModule {}
