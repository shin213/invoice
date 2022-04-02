/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { InvoiceFormatLog } from './invoice-format-log'
import { InvoiceFormatLogsService } from './invoice-format-logs.service'
import { InvoiceFormat } from 'src/invoice-formats/invoice-format'
import { InvoiceFormatElement } from 'src/invoice-format-elements/invoice-format-element'
import { InvoiceFormatDetailElement } from 'src/invoice-format-detail-elements/invoice-format-detail-element'
import { AdminAuthorizerGuard } from 'src/aws/admin-authorizer/admin-authorizer.guard'

@Resolver((of: unknown) => InvoiceFormatLog)
export class InvoiceFormatLogsResolver {
  constructor(private logsService: InvoiceFormatLogsService) {}

  // @UseGuards(AdminAuthorizerGuard)
  // @Query((returns) => [InvoiceFormatLog])
  // invoiceFormatLogs(): Promise<InvoiceFormatLog[]> {
  //   return this.logsService.findAll()
  // }

  // @UseGuards(AdminAuthorizerGuard)
  // @Query((returns) => InvoiceFormatLog)
  // async getInvoiceFormatLog(
  //   @Args({ name: 'id', type: () => String }) id: string,
  // ) {
  //   const log = await this.logsService.findOneById(id)
  //   if (!log) {
  //     throw new NotFoundException(id)
  //   }
  //   return log
  // }

  @ResolveField('invoiceFormat', (returns) => InvoiceFormat)
  async invoiceFormat(
    @Parent() log: InvoiceFormatLog,
  ): Promise<InvoiceFormat | undefined> {
    return await this.logsService.invoiceFormat(log.invoiceFormatId)
  }

  @ResolveField('elements', (returns) => [InvoiceFormatElement])
  async elements(
    @Parent() log: InvoiceFormatLog,
  ): Promise<InvoiceFormatElement[]> {
    return await this.logsService.elements(log.id)
  }

  @ResolveField('detailElements', (returns) => [InvoiceFormatDetailElement])
  async detailElements(
    @Parent() log: InvoiceFormatLog,
  ): Promise<InvoiceFormatDetailElement[]> {
    return await this.logsService.detailElements(log.id)
  }
}
