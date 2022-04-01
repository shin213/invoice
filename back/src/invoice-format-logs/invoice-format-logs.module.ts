import { Module } from '@nestjs/common'
import { InvoiceFormatLogsResolver } from './invoice-format-logs.resolver'
import { InvoiceFormatLogsService } from './invoice-format-logs.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFormatLog } from './invoice-format-log'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'
import { InvoiceFormatElementsModule } from 'src/invoice-format-elements/invoice-format-elements.module'
import { InvoiceFormatElementsService } from 'src/invoice-format-elements/invoice-format-elements.service'
import { InvoiceFormatDetailElementsModule } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.module'
import { InvoiceFormatDetailElementsService } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceFormatLog]),
    CompaniesModule,
    InvoiceFormatsModule,
    InvoiceFormatElementsModule,
    InvoiceFormatDetailElementsModule,
  ],
  providers: [
    InvoiceFormatLogsResolver,
    InvoiceFormatLogsService,
    CompaniesService,
    InvoiceFormatsService,
    InvoiceFormatElementsService,
    InvoiceFormatDetailElementsService,
  ],
  exports: [InvoiceFormatLogsModule, InvoiceFormatLogsService, TypeOrmModule],
})
export class InvoiceFormatLogsModule {}
