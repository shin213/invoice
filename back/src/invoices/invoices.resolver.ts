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
import { Construction } from 'src/constructions/construction'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'
import { UpdateInvoiceInput } from './dto/updateInvoice.input'

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

  @ResolveField('construction')
  async construction(@Parent() invoice: Invoice): Promise<Construction | null> {
    return this.invoicesService.construction(invoice.id)
  }

  @ResolveField('invoiceFormatLog')
  async invoiceFormatLog(
    @Parent() invoice: Invoice,
  ): Promise<InvoiceFormatLog | undefined> {
    return await this.invoicesService.invoiceFormatLog(
      invoice.invoiceFormatLogId,
    )
  }

  @Query((returns) => [Invoice])
  async notRequestedInvoices(): Promise<Invoice[]> {
    return this.invoicesService.notRequestedInvoices()
  }

  @Mutation((returns) => Invoice)
  addInvoice(
    @Args('newInvoice') newInvoice: NewInvoiceInput,
  ): Promise<Invoice> {
    return this.invoicesService.create(newInvoice)
  }

  @Mutation((returns) => Invoice)
  updateInvoice(@Args('input') input: UpdateInvoiceInput): Promise<Invoice> {
    return this.invoicesService.update(input)
  }

  @Mutation((returns) => Boolean)
  async removeInvoice(@Args({ name: 'id' }) id: string) {
    return this.invoicesService.remove(id)
  }
}
