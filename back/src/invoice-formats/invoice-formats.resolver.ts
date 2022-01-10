/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NewInvoiceFormatInput } from './dto/newInvoiceFormat.input'
import { InvoiceFormat } from './invoice-format'
import { InvoiceFormatsService } from './invoice-formats.service'

@Resolver((of) => InvoiceFormat)
export class InvoiceFormatsResolver {
  constructor(private foramtsService: InvoiceFormatsService) {}

  @Query((returns) => [InvoiceFormat])
  invoice_formats(): Promise<InvoiceFormat[]> {
    return this.foramtsService.findAll()
  }

  @Query((returns) => InvoiceFormat)
  async getInvoiceFormat(@Args({ name: 'id', type: () => Int }) id: number) {
    const format = await this.foramtsService.findOneById(id)
    if (!format) {
      throw new NotFoundException(id)
    }
    return format
  }

  @Mutation((returns) => InvoiceFormat)
  addInvoiceFormat(
    @Args('newInvoiceFormat') newFormat: NewInvoiceFormatInput,
  ): Promise<InvoiceFormat> {
    return this.foramtsService.create(newFormat)
  }

  @Mutation((returns) => Boolean)
  async removeInvoiceFormat(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.foramtsService.remove(id)
  }
}
