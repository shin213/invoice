import { Module } from '@nestjs/common'
import { InvoicesTransferService } from './invoices-transfer.service'
import { InvoicesTransferResolver } from './invoices-transfer.resolver'

@Module({
  providers: [InvoicesTransferService, InvoicesTransferResolver],
  exports: [InvoicesTransferModule, InvoicesTransferService],
})
export class InvoicesTransferModule {}
