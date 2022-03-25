import { Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsResolver } from './comments.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './comment'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { UsersModule } from 'src/users/users.module'
import { RequestsModule } from 'src/requests/requests.module'
import { InvoicesService } from 'src/invoices/invoices.service'
import { UsersService } from 'src/users/users.service'
import { RequestsService } from 'src/requests/requests.service'
import { CompaniesService } from 'src/companies/companies.service'
import { CompaniesModule } from 'src/companies/companies.module'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { RequestReceiverService } from 'src/request-receiver/request-receiver.service'
import { InvoiceFormatLogsModule } from 'src/invoice-format-logs/invoice-format-logs.module'
import { InvoiceFormatLogsService } from 'src/invoice-format-logs/invoice-format-logs.service'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatElementsModule } from 'src/invoice-format-elements/invoice-format-elements.module'
import { InvoiceFormatDetailElementsModule } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.module'
import { InvoiceFormatElementsService } from 'src/invoice-format-elements/invoice-format-elements.service'
import { InvoiceFormatDetailElementsService } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    InvoicesModule,
    UsersModule,
    RequestReceiverModule,
    RequestsModule,
    CompaniesModule,
    InvoiceFormatLogsModule,
    InvoiceFormatsModule,
    InvoiceFormatElementsModule,
    InvoiceFormatDetailElementsModule
  ],
  providers: [
    CommentsService,
    CommentsResolver,
    InvoicesService,
    UsersService,
    RequestReceiverService,
    RequestsService,
    CompaniesService,
    InvoiceFormatLogsService,
    InvoiceFormatsService,
    InvoiceFormatElementsService,
    InvoiceFormatDetailElementsService
  ],
  exports: [CommentsModule, TypeOrmModule],
})
export class CommentsModule {}
