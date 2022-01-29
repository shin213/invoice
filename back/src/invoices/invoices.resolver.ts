/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import { Args, Resolver, Query, Int, Mutation } from '@nestjs/graphql'
import { NewInvoiceInput } from './dto/newInvoice.input'
import { Invoice } from './invoice'
import { InvoicesService } from './invoices.service'

@Resolver((of) => Invoice)
export class InvoicesResolver {
  constructor(private invoicesService: InvoicesService) {}

  @Query((returns) => [Invoice])
  invoices(): Promise<Invoice[]> {
    return this.invoicesService.findAll()
  }

  @Query((returns) => Invoice)
  async getInvoice(@Args({ name: 'id', type: () => Int }) id: number) {
    const invoice = await this.invoicesService.findOneById(id)
    if (!invoice) {
      throw new NotFoundException(id)
    }
    return invoice
  }

  @Mutation((returns) => Invoice)
  addInvoice(
    @Args('newInvoice') newInvoice: NewInvoiceInput,
  ): Promise<Invoice> {
    return this.invoicesService.create(newInvoice)
  }

  @Mutation((returns) => Boolean)
  async removeInvoice(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.invoicesService.remove(id)
  }
}
