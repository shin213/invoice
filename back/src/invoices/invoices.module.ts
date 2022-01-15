import { Module } from '@nestjs/common'
import { InvoicesResolver } from './invoices.resolver'
import { InvoicesService } from './invoices.service'

@Module({
  providers: [InvoicesResolver, InvoicesService],
})
export class InvoicesModule {}
