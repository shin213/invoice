import { Module } from '@nestjs/common'
import { InvoiceFormatsLogsResolver } from './invoice-formats-logs.resolver'
import { InvoiceFormatsLogsService } from './invoice-formats-logs.service'

@Module({
  providers: [InvoiceFormatsLogsResolver, InvoiceFormatsLogsService],
})
export class InvoiceFormatsLogsModule {}
