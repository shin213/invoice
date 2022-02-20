/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { InvoiceFormatLog } from './invoice-format-log'
import { InvoiceFormatLogsService } from './invoice-format-logs.service'
import { InvoiceFormat } from 'src/invoice-formats/invoice-format'
import { InvoiceFormatElement } from 'src/invoice-format-elements/invoice-format-element'

@Resolver((of) => InvoiceFormatLog)
export class InvoiceFormatLogsResolver {
  constructor(private logsService: InvoiceFormatLogsService) {}

  @Query((returns) => [InvoiceFormatLog])
  invoiceFormatLogs(): Promise<InvoiceFormatLog[]> {
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

  @ResolveField('invoiceFormat', (returns) => InvoiceFormat)
  async invoiceFormat(@Parent() log: InvoiceFormatLog): Promise<InvoiceFormat> {
    return await this.logsService.invoiceFormat(log.invoiceFormatId)
  }

  @ResolveField('elements', (returns) => [InvoiceFormatElement])
  async elements(
    @Parent() log: InvoiceFormatLog,
  ): Promise<InvoiceFormatElement[]> {
    return await this.logsService.elements(log.id)
  }
}
