/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import {
  Args,
  Resolver,
  Query,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { Company } from 'src/companies/company'
import { User } from 'src/users/user'
import { NewInvoiceInput } from './dto/newInvoice.input'
import { Invoice } from './invoice'
import { InvoicesService } from './invoices.service'

@Resolver((of: unknown) => Invoice)
export class InvoicesResolver {
  constructor(private invoicesService: InvoicesService) {}

  @Query((returns) => [Invoice])
  invoices(): Promise<Invoice[]> {
    return this.invoicesService.findAll()
  }

  @Query((returns) => Invoice)
  async getInvoice(@Args({ name: 'id' }) id: string) {
    const invoice = await this.invoicesService.findOneById(id)
    if (!invoice) {
      throw new NotFoundException(id)
    }
    return invoice
  }

  @ResolveField('createdBy')
  async createdBy(@Parent() invoice: Invoice): Promise<User> {
    return this.invoicesService.createdBy(invoice.id)
  }

  @ResolveField('company')
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
  async removeInvoice(@Args({ name: 'id' }) id: string) {
    return this.invoicesService.remove(id)
  }
}
