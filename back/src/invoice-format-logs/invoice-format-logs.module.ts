import { Module } from '@nestjs/common'
import { InvoiceFormatLogsResolver } from './invoice-format-logs.resolver'
import { InvoiceFormatLogsService } from './invoice-format-logs.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFormatLog } from './invoice-format-log'
import { CompaniesModule } from 'src/companies/companies.module'
import { InvoiceFormatsModule } from 'src/invoice-formats/invoice-formats.module'
import { InvoiceFormatElementsModule } from 'src/invoice-format-elements/invoice-format-elements.module'
import { InvoiceFormatDetailElementsModule } from 'src/invoice-format-detail-elements/invoice-format-detail-elements.module'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceFormatLog]),
    CognitoModule,
    CompaniesModule,
    InvoiceFormatsModule,
    InvoiceFormatElementsModule,
    InvoiceFormatDetailElementsModule,
  ],
  providers: [InvoiceFormatLogsResolver, InvoiceFormatLogsService],
  exports: [InvoiceFormatLogsModule, InvoiceFormatLogsService, TypeOrmModule],
})
export class InvoiceFormatLogsModule {}
