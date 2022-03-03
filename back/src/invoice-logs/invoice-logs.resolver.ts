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
import { NewInvoiceLogInput } from './dto/newInvoiceLog.input'
import { InvoiceLogsService } from './invoice-logs.service'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'
import { UpdateInvoiceLogInput } from './dto/updateInvoiceLog.input'

@Resolver((of: unknown) => InvoiceLog)
export class InvoiceLogsResolver {
  constructor(private logsService: InvoiceLogsService) {}

  @Query((returns) => [InvoiceLog])
  invoiceLogs(): Promise<InvoiceLog[]> {
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

  @ResolveField('invoiceFormatLog')
  async invoiceFormatLog(
    @Parent() format: InvoiceLog,
  ): Promise<InvoiceFormatLog | undefined> {
    return await this.logsService.invoiceFormatLog(format.invoiceFormatLogId)
  }

  @Mutation((returns) => InvoiceLog)
  addInvoiceLog(
    @Args('newInvoiceLog') newInvoiceLog: NewInvoiceLogInput,
  ): Promise<InvoiceLog> {
    return this.logsService.create(newInvoiceLog)
  }

  @Mutation((returns) => InvoiceLog)
  updateInvoiceLog(
    @Args('input') input: UpdateInvoiceLogInput,
  ): Promise<InvoiceLog> {
    return this.logsService.update(input)
  }

  @Mutation((returns) => Boolean)
  async removeInvoiceLog(@Args({ name: 'id', type: () => String }) id: string) {
    return this.logsService.remove(id)
  }
}
