/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql'
import { InvoiceFormatElement } from './invoice-format-element'
import { InvoiceFormatElementsService } from './invoice-format-elements.service'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'

@Resolver((of) => InvoiceFormatElement)
export class InvoiceFormatElementsResolver {
  constructor(private service: InvoiceFormatElementsService) {}

  @Query((returns) => [InvoiceFormatElement])
  async invoiceFormatElements(
    @Args({ name: 'logId', type: () => String }) logId: string,
  ) {
    const elements = await this.service.findByLogId(logId)
    if (!elements) {
      throw new NotFoundException(logId)
    }
    return elements
  }

  @Query((returns) => InvoiceFormatElement)
  async getInvoiceFormatElement(
    @Args({ name: 'id', type: () => String }) id: string,
  ) {
    const element = await this.service.findOneById(id)
    if (!element) {
      throw new NotFoundException(id)
    }
    return element
  }

  @ResolveField('invoiceFormatLog')
  async invoiceFormatLog(
    @Parent() element: InvoiceFormatElement,
  ): Promise<InvoiceFormatLog> {
    return await this.service.invoiceFormatLog(element.invoice_format_log_id)
  }
}
