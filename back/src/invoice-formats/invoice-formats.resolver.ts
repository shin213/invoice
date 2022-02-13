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
import { NewInvoiceFormatInput } from './dto/newInvoiceFormat.input'
import { InvoiceFormat } from './invoice-format'
import { InvoiceFormatsService } from './invoice-formats.service'
import { Company } from 'src/companies/company'

@Resolver((of) => InvoiceFormat)
export class InvoiceFormatsResolver {
  constructor(private foramtsService: InvoiceFormatsService) {}

  @Query((returns) => [InvoiceFormat])
  invoice_formats(): Promise<InvoiceFormat[]> {
    return this.foramtsService.findAll()
  }

  @Query((returns) => InvoiceFormat)
  async getInvoiceFormat(@Args({ name: 'id', type: () => String }) id: string) {
    const format = await this.foramtsService.findOneById(id)
    if (!format) {
      throw new NotFoundException(id)
    }
    return format
  }

  @ResolveField('company')
  async company(@Parent() format: InvoiceFormat): Promise<Company> {
    return await this.foramtsService.company(format.company_id)
  }

  @Mutation((returns) => InvoiceFormat)
  addInvoiceFormat(
    @Args('newInvoiceFormat') newFormat: NewInvoiceFormatInput,
  ): Promise<InvoiceFormat> {
    return this.foramtsService.create(newFormat)
  }

  @Mutation((returns) => Boolean)
  async removeInvoiceFormat(
    @Args({ name: 'id', type: () => String }) id: string,
  ) {
    return this.foramtsService.remove(id)
  }
}
