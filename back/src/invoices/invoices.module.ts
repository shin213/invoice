import { Module } from '@nestjs/common'
import { InvoicesResolver } from './invoices.resolver'
import { InvoicesService } from './invoices.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Invoice } from './invoice'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { ConstructionsModule } from 'src/constructions/constructions.module'
import { ConstructionsService } from 'src/constructions/constructions.service'
import { InvoiceFormatLogsModule } from 'src/invoice-format-logs/invoice-format-logs.module'
import { InvoiceFormatLogsService } from 'src/invoice-format-logs/invoice-format-logs.service'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'
import { InvoiceFormatElementsModule } from 'src/invoice-format-elements/invoice-format-elements.module'
import { InvoiceFormatElementsService } from 'src/invoice-format-elements/invoice-format-elements.service'
import { InvoiceFormatDetailElementsService } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.service'
import { InvoiceFormatDetailElementsModule } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    UsersModule,
    CompaniesModule,
    ConstructionsModule,
    InvoiceFormatLogsModule,
    InvoiceFormatsModule,
    InvoiceFormatElementsModule,
    InvoiceFormatDetailElementsModule,
  ],
  providers: [
    InvoicesResolver,
    InvoicesService,
    UsersService,
    CompaniesService,
    ConstructionsService,
    InvoiceFormatLogsService,
    InvoiceFormatsService,
    InvoiceFormatElementsService,
    InvoiceFormatDetailElementsService,
  ],
  exports: [InvoicesModule, TypeOrmModule],
})
export class InvoicesModule {}
