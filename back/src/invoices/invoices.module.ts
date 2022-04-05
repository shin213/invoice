import { Module } from '@nestjs/common'
import { InvoicesService } from './invoices.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Invoice } from './invoice'
import { InvoiceFormatLogsModule } from 'src/invoice-format-logs/invoice-format-logs.module'
import { CognitoModule } from 'src/aws/cognito/cognito.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    CognitoModule,
    InvoiceFormatLogsModule,
  ],
  providers: [InvoicesService],
  exports: [InvoicesModule, InvoicesService, TypeOrmModule],
})
export class InvoicesModule {}
