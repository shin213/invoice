import { Module } from '@nestjs/common'
import { InvoiceFileService } from './invoice-file.service'
import { InvoiceFileResolver } from './invoice-file.resolver'

@Module({
  providers: [InvoiceFileService, InvoiceFileResolver],
})
export class InvoiceFileModule {}
