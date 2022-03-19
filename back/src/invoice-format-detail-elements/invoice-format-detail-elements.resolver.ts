/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import { Args, Query, Resolver } from '@nestjs/graphql'
import { InvoiceFormatDetailElement } from './invoice-format-detail-element'
import { InvoiceFormatDetailElementsService } from './invoice-format-detail-elements.service'

@Resolver((of: unknown) => InvoiceFormatDetailElement)
export class InvoiceFormatDetailElementsResolver {
  constructor(private service: InvoiceFormatDetailElementsService) {}

  @Query((returns) => [InvoiceFormatDetailElement])
  async invoiceFormatDetailElements(
    @Args({ name: 'logId', type: () => String }) logId: string,
  ) {
    const detailElements = await this.service.findByLogId(logId)
    if (!detailElements) {
      throw new NotFoundException(logId)
    }
    return detailElements
  }

  @Query((returns) => InvoiceFormatDetailElement)
  async getInvoiceFormatDetailElement(
    @Args({ name: 'id', type: () => String }) id: string,
  ) {
    const detailElement = await this.service.findOneById(id)
    if (!detailElement) {
      throw new NotFoundException(id)
    }
    return detailElement
  }
}
