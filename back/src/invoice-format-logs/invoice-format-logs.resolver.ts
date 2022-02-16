/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { InvoiceFormatLog } from './invoice-format-log'
import { NewInvoiceFormatInputLog } from './dto/newInvoiceFormatLog.input'
import { InvoiceFormatLogsService } from './invoice-format-logs.service'
import { InvoiceFormat } from 'src/invoice-formats/invoice-format'

@Resolver((of) => InvoiceFormatLog)
export class InvoiceFormatLogsResolver {
  constructor(private logsService: InvoiceFormatLogsService) {}

  @Query((returns) => [InvoiceFormatLog])
  invoice_format_logs(): Promise<InvoiceFormatLog[]> {
    return this.logsService.findAll()
  }

  @Query((returns) => InvoiceFormatLog)
  async getInvoiceFormatLog(
    @Args({ name: 'id', type: () => String }) id: string,
  ) {
    const log = await this.logsService.findOneById(id)
    if (!log) {
      throw new NotFoundException(id)
    }
    return log
  }

  @ResolveField('invoice_format')
  async invoice_format(
    @Parent() format: InvoiceFormatLog,
  ): Promise<InvoiceFormat> {
    return await this.logsService.invoice_format(format.invoice_format_id)
  }

  @Mutation((returns) => InvoiceFormatLog)
  addInvoiceFormatLog(
    @Args('newInvoiceFormatLog') newFormat: NewInvoiceFormatInputLog,
  ): Promise<InvoiceFormatLog> {
    return this.logsService.create(newFormat)
  }

  @Mutation((returns) => Boolean)
  async removeInvoiceFormatLog(
    @Args({ name: 'id', type: () => String }) id: string,
  ) {
    return this.logsService.remove(id)
  }
}
