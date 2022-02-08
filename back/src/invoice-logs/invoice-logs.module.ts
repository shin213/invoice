import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceLog } from './invoice-log'
import { InvoiceLogsResolver } from './invoice-logs.resolver'
import { InvoiceLogsService } from './invoice-logs.service'
import { InvoiceFormatElementsModule } from 'src/invoice-format-elements/invoice-format-elements.module'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { InvoiceFormatLogsModule } from 'src/invoice-format-logs/invoice-format-logs.module'
import { InvoiceFormatLogsService } from 'src/invoice-format-logs/invoice-format-logs.service'
import { InvoiceLogElementsModule } from 'src/invoice-log-elements/invoice-log-elements.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceLog]),
    InvoiceFormatElementsModule,
    UsersModule,
    InvoiceFormatsModule,
    CompaniesModule,
    InvoiceFormatLogsModule,
    InvoiceLogElementsModule,
  ],
  providers: [
    InvoiceLogsResolver,
    InvoiceLogsService,
    InvoiceFormatLogsService,
    UsersService,
    InvoiceFormatsService,
    CompaniesService,
  ],
})
export class InvoiceLogsModule {}
