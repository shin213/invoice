import { Module } from '@nestjs/common'
import { InvoiceFormatsResolver } from './invoice-formats.resolver'
import { InvoiceFormatsService } from './invoice-formats.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFormat } from './invoice-format'

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceFormat])],
  providers: [InvoiceFormatsResolver, InvoiceFormatsService],
})
export class InvoiceFormatsModule {}
