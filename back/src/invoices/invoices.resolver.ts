/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, UseGuards } from '@nestjs/common'
import {
  Args,
  Resolver,
  Query,
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
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthUser } from 'src/aws/cognito/cognito'
import { companyMismatchError } from 'src/utils/errors'

@Resolver((of: unknown) => Invoice)
export class InvoicesResolver {
  constructor(private invoicesService: InvoicesService) {}

  @UseGuards(AuthorizerGuard)
  @Query((returns) => [Invoice])
  invoices(@CurrentUser() user: AuthUser): Promise<Invoice[]> {
    return this.invoicesService.findAll(user.dbUser.companyId)
  }

  @UseGuards(AuthorizerGuard)
  @Query((returns) => Invoice)
  async getInvoice(
    @CurrentUser() user: AuthUser,
    @Args({ name: 'id' }) id: string,
  ) {
    const invoice = await this.invoicesService.findOneById(id)
    if (!invoice) {
      throw new NotFoundException(id)
    }
    if (invoice.companyId !== user.dbUser.companyId) {
      throw companyMismatchError()
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

  @UseGuards(AuthorizerGuard)
  @Query((returns) => [Invoice])
  async notRequestedInvoices(
    @CurrentUser() user: AuthUser,
  ): Promise<Invoice[]> {
    return this.invoicesService.inputtingSystemInvoices(user.dbUser.companyId)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Invoice)
  addInvoice(
    @CurrentUser() user: AuthUser,
    @Args('newInvoice') newInvoice: NewInvoiceInput,
  ): Promise<Invoice> {
    return this.invoicesService.create(newInvoice, user.dbUser)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Invoice)
  async updateInvoice(
    @CurrentUser() user: AuthUser,
    @Args('input') input: UpdateInvoiceInput,
  ): Promise<Invoice> {
    const invoice = await this.invoicesService.findOneById(input.id)
    if (invoice == undefined) {
      throw new NotFoundException(input.id)
    }
    if (invoice.companyId !== user.dbUser.companyId) {
      throw companyMismatchError()
    }
    return await this.invoicesService.update(input)
  }

  // @Mutation((returns) => Boolean)
  // async removeInvoice(@Args({ name: 'id' }) id: string) {
  //   return this.invoicesService.remove(id)
  // }
}
