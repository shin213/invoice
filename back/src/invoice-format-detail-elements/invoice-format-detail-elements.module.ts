import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFormatDetailElement } from './invoice-format-detail-element'
import { InvoiceFormatDetailElementsService } from './invoice-format-detail-elements.service'
import { InvoiceFormatDetailElementsResolver } from './invoice-format-detail-elements.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceFormatDetailElement])],
  providers: [
    InvoiceFormatDetailElementsService,
    InvoiceFormatDetailElementsResolver,
  ],
  exports: [InvoiceFormatDetailElementsModule, TypeOrmModule],
})
export class InvoiceFormatDetailElementsModule {}
