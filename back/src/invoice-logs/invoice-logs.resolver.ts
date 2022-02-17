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
import { InvoiceLog } from './invoice-log'
import { NewInvoiceLogInputLog } from './dto/newInvoiceLog.input'
import { InvoiceLogsService } from './invoice-logs.service'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'
import { UpdateInvoiceLogInput } from './dto/updateInvoiceLog.input'

@Resolver((of) => InvoiceLog)
export class InvoiceLogsResolver {
  constructor(private logsService: InvoiceLogsService) {}

  @Query((returns) => [InvoiceLog])
  invoice_logs(): Promise<InvoiceLog[]> {
    return this.logsService.findAll()
  }

  @Query((returns) => InvoiceLog)
  async getInvoiceLog(@Args({ name: 'id', type: () => String }) id: string) {
    const log = await this.logsService.findOneById(id)
    if (!log) {
      throw new NotFoundException(id)
    }
    return log
  }

  @ResolveField('invoice_format_log')
  async invoice_format_log(
    @Parent() format: InvoiceLog,
  ): Promise<InvoiceFormatLog> {
    return await this.logsService.invoiceFormatLog(format.invoice_format_log_id)
  }

  @Mutation((returns) => InvoiceLog)
  addInvoiceLog(
    @Args('newInvoiceLog') newInvoiceLog: NewInvoiceLogInputLog,
  ): Promise<InvoiceLog> {
    return this.logsService.create(newInvoiceLog)
  }

  @Mutation((returns) => InvoiceLog)
  updateInvoiceLog(
    @Args('updateInvoiceLog') updateInvoiceLog: UpdateInvoiceLogInput,
  ): Promise<InvoiceLog> {
    return this.logsService.update(updateInvoiceLog)
  }

  @Mutation((returns) => Boolean)
  async removeInvoiceLog(@Args({ name: 'id', type: () => String }) id: string) {
    return this.logsService.remove(id)
  }
}
