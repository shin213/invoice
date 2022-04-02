import { Module } from '@nestjs/common'
import { JudgementsService } from './judgements.service'
import { JudgementsResolver } from './judgements.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Judgement } from './judgement'
import { UsersModule } from 'src/users/users.module'
import { CommentsModule } from 'src/comments/comments.module'
import { RequestsModule } from 'src/requests/requests.module'
import { CompaniesModule } from 'src/companies/companies.module'
import { InvoicesModule } from 'src/invoices/invoices.module'
import { RequestReceiverModule } from 'src/request-receiver/request-receiver.module'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'
import { InvoiceFormatLogsModule } from 'src/invoice-format-logs/invoice-format-logs.module'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatElementsModule } from 'src/invoice-format-elements/invoice-format-elements.module'
import { InvoiceFormatDetailElementsModule } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Judgement]),
    UnconfirmedUsersModule,
    UsersModule,
    CommentsModule,
    RequestReceiverModule,
    RequestsModule,
    CompaniesModule,
    InvoicesModule,
    InvoiceFormatLogsModule,
    InvoiceFormatsModule,
    InvoiceFormatElementsModule,
    InvoiceFormatDetailElementsModule,
  ],
  providers: [JudgementsService, JudgementsResolver],
  exports: [JudgementsModule, JudgementsService, TypeOrmModule],
})
export class JudgementsModule {}
