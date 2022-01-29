/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import {
  Args,
  Resolver,
  Query,
  Int,
  Mutation,
  ResolveProperty,
  Parent,
} from '@nestjs/graphql'
import { Company } from 'src/companies/company'
import { User } from 'src/users/user'
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

  @ResolveProperty('created_by')
  async created_by(@Parent() invoice: Invoice): Promise<User> {
    return this.invoicesService.created_by(invoice.id)
  }

  @ResolveProperty('company')
  async company(@Parent() invoice: Invoice): Promise<Company> {
    return this.invoicesService.company(invoice.id)
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
