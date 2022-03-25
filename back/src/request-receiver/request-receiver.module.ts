import { forwardRef, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { InvoiceFormatDetailElementsModule } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.module'
import { InvoiceFormatDetailElementsService } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.service'
import { InvoiceFormatElementsModule } from 'src/invoice-format-elements/invoice-format-elements.module'
import { InvoiceFormatElementsService } from 'src/invoice-format-elements/invoice-format-elements.service'
import { InvoiceFormatLogsModule } from 'src/invoice-format-logs/invoice-format-logs.module'
import { InvoiceFormatLogsService } from 'src/invoice-format-logs/invoice-format-logs.service'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'
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
    InvoiceFormatLogsModule,
    InvoiceFormatsModule,
    InvoiceFormatElementsModule,
    InvoiceFormatDetailElementsModule,
  ],
  providers: [
    RequestReceiverResolver,
    RequestReceiverService,
    UsersService,
    InvoicesService,
    CompaniesService,
    InvoiceFormatLogsService,
    InvoiceFormatsService,
    InvoiceFormatElementsService,
    InvoiceFormatDetailElementsService,
  ],
  exports: [RequestReceiverModule, TypeOrmModule],
})
export class RequestReceiverModule {}
