import { Module } from '@nestjs/common'
import { InvoiceFormatsResolver } from './invoice-formats.resolver'
import { InvoiceFormatsService } from './invoice-formats.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFormat } from './invoice-format'
import { CompaniesModule } from 'src/companies/companies.module'
import { CompaniesService } from 'src/companies/companies.service'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceFormat]),
    CognitoModule,
    CompaniesModule,
  ],
  providers: [InvoiceFormatsResolver, InvoiceFormatsService, CompaniesService],
  exports: [InvoiceFormatsModule, InvoiceFormatsService, TypeOrmModule],
})
export class InvoiceFormatsModule {}
