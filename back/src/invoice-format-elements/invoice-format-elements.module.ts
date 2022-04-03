import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { InvoiceFormatElement } from './invoice-format-element'
import { InvoiceFormatElementsService } from './invoice-format-elements.service'
import { InvoiceFormatElementsResolver } from './invoice-format-elements.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceFormatElement])],
  providers: [InvoiceFormatElementsService, InvoiceFormatElementsResolver],
  exports: [
    InvoiceFormatElementsModule,
    InvoiceFormatElementsService,
    TypeOrmModule,
  ],
})
export class InvoiceFormatElementsModule {}
