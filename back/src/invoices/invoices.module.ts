import { Module } from '@nestjs/common'
import { InvoicesResolver } from './invoices.resolver'
import { InvoicesService } from './invoices.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Invoice } from './invoice'

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  providers: [InvoicesResolver, InvoicesService],
  exports: [InvoicesModule, TypeOrmModule],
})
export class InvoicesModule {}
