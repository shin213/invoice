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
import { NewInvoiceInput } from '../invoices/dto/newInvoice.input'
import { Construction } from 'src/constructions/construction'
import { InvoiceFormatLog } from 'src/invoice-format-logs/invoice-format-log'
import { UpdateInvoiceInput } from '../invoices/dto/updateInvoice.input'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthUser } from 'src/aws/cognito/cognito'
import { companyMismatchError } from 'src/utils/errors'
import { InvoicesResolveService } from './invoices-resolve.service'
import { Invoice, InvoiceStatus } from 'src/invoices/invoice'
import { RequestPairStatus } from 'src/common/invoice-status'

@Resolver((of: unknown) => Invoice)
export class InvoicesResolveResolver {
  constructor(private service: InvoicesResolveService) {}

  @UseGuards(AuthorizerGuard)
  @Query((returns) => [Invoice])
  invoices(@CurrentUser() user: AuthUser): Promise<Invoice[]> {
    return this.service.findAll(user.dbUser.companyId)
  }

  @UseGuards(AuthorizerGuard)
  @Query((returns) => Invoice)
  async invoice(
    @CurrentUser() user: AuthUser,
    @Args({ name: 'id' }) id: string,
  ) {
    const invoice = await this.service.findOneById(id)
    if (!invoice) {
      throw new NotFoundException(id)
    }
    if (invoice.companyId !== user.dbUser.companyId) {
      throw companyMismatchError()
    }
    return invoice
  }

  @ResolveField('createdBy')
  createdBy(@Parent() invoice: Invoice): Promise<User> {
    return this.service.createdBy(invoice.id)
  }

  @ResolveField('company')
  company(@Parent() invoice: Invoice): Promise<Company> {
    return this.service.company(invoice.id)
  }

  @ResolveField('construction')
  construction(@Parent() invoice: Invoice): Promise<Construction | undefined> {
    return this.service.construction(invoice.id)
  }

  @ResolveField('invoiceFormatLog')
  async invoiceFormatLog(
    @Parent() invoice: Invoice,
  ): Promise<InvoiceFormatLog | undefined> {
    return await this.service.invoiceFormatLog(invoice.invoiceFormatLogId)
  }

  @ResolveField('invoiceFiles')
  invoiceFiles(@Parent() invoice: Invoice) {
    return this.service.invoiceFiles(invoice.id)
  }

  @UseGuards(AuthorizerGuard)
  @ResolveField('requestPairStatus')
  async requestPairStatus(
    @CurrentUser() user: AuthUser,
    @Parent() invoice: Invoice,
  ): Promise<RequestPairStatus> {
    return this.service.requestPair(user.dbUser, invoice)
  }

  @UseGuards(AuthorizerGuard)
  @Query((returns) => [Invoice])
  async invoicesByStatus(
    @CurrentUser() user: AuthUser,
    @Args('status', { type: () => InvoiceStatus }) status: InvoiceStatus,
  ): Promise<Invoice[]> {
    return this.service.findByStatus(user.dbUser.companyId, status)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Invoice)
  addInvoice(
    @CurrentUser() user: AuthUser,
    @Args('newInvoice') newInvoice: NewInvoiceInput,
  ): Promise<Invoice> {
    return this.service.create(user.dbUser, newInvoice)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Invoice)
  async updateInvoice(
    @CurrentUser() user: AuthUser,
    @Args('input') input: UpdateInvoiceInput,
  ): Promise<Invoice> {
    const invoice = await this.service.findOneById(input.id)
    if (invoice == undefined) {
      throw new NotFoundException(input.id)
    }
    if (invoice.companyId !== user.dbUser.companyId) {
      throw companyMismatchError()
    }
    return await this.service.update(input)
  }

  // @Mutation((returns) => Boolean)
  // async removeInvoice(@Args({ name: 'id' }) id: string) {
  //   return this.service.remove(id)
  // }
}
