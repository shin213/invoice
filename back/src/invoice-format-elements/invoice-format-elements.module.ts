import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFormatElement } from './invoice-format-element'
import { InvoiceFormatElementsService } from './invoice-format-elements.service'
import { InvoiceFormatElementsResolver } from './invoice-format-elements.resolver'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'
import { InvoiceFormatLogsModule } from 'src/invoice-format-logs/invoice-format-logs.module'
import { InvoiceFormatLogsService } from 'src/invoice-format-logs/invoice-format-logs.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceFormatElement]),
    CompaniesModule,
    InvoiceFormatsModule,
    InvoiceFormatLogsModule,
  ],
  providers: [
    InvoiceFormatElementsService,
    InvoiceFormatElementsResolver,
    CompaniesService,
    InvoiceFormatsService,
    InvoiceFormatLogsService,
  ],
  exports: [InvoiceFormatElementsModule, TypeOrmModule],
})
export class InvoiceFormatElementsModule {}
