import { Module } from '@nestjs/common'
import { InvoiceFormatLogsResolver } from './invoice-format-logs.resolver'
import { InvoiceFormatLogsService } from './invoice-format-logs.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFormatLog } from './invoice-format-log'
import { InvoiceFormatElementsModule } from 'src/invoice-format-elements/invoice-format-elements.module'
import { UsersModule } from 'src/users/users.module'
import { UsersService } from 'src/users/users.service'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatsService } from 'src/invoice-formats/invoice-formats.service'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceFormatLog]),
    InvoiceFormatElementsModule,
    UsersModule,
    InvoiceFormatsModule,
    CompaniesModule,
  ],
  providers: [
    InvoiceFormatLogsResolver,
    InvoiceFormatLogsService,
    UsersService,
    InvoiceFormatsService,
    CompaniesService,
  ],
  exports: [InvoiceFormatLogsModule, TypeOrmModule],
})
export class InvoiceFormatLogsModule {}
