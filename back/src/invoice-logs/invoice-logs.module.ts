import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceLog } from './invoice-log'
import { InvoiceLogsResolver } from './invoice-logs.resolver'
import { InvoiceLogsService } from './invoice-logs.service'
import { InvoiceFormatElementsModule } from 'src/invoice-format-elements/invoice-format-elements.module'
import { InvoiceFormatDetailElementsModule } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.module'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { InvoiceFormatLogsModule } from 'src/invoice-format-logs/invoice-format-logs.module'
import { InvoiceFormatLogsService } from 'src/invoice-format-logs/invoice-format-logs.service'
import { InvoiceLogElementsModule } from 'src/invoice-log-elements/invoice-log-elements.module'
import { InvoiceFormatElementsService } from 'src/invoice-format-elements/invoice-format-elements.service'
import { InvoiceLogDetailElementsModule } from 'src/invoice-log-detail-elements/invoice-log-detail-elements.module'
import { InvoiceFormatDetailElementsService } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.service'
import { UnconfirmedUsersModule } from 'src/unconfirmed-users/unconfirmed-users.module'
import { UnconfirmedUsersService } from 'src/unconfirmed-users/unconfirmed-users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceLog]),
    UnconfirmedUsersModule,
    CompaniesModule,
    UsersModule,
    InvoiceFormatsModule,
    InvoiceFormatLogsModule,
    InvoiceFormatElementsModule,
    InvoiceLogElementsModule,
    InvoiceFormatDetailElementsModule,
    InvoiceLogDetailElementsModule,
  ],
  providers: [
    InvoiceLogsResolver,
    InvoiceLogsService,
    UnconfirmedUsersService,
    CompaniesService,
    UsersService,
    InvoiceFormatsService,
    InvoiceFormatLogsService,
    InvoiceFormatElementsService,
    InvoiceFormatDetailElementsService,
  ],
})
export class InvoiceLogsModule {}
