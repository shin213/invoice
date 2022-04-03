/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Query } from '@nestjs/graphql'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AuthUser } from 'src/aws/cognito/cognito'
import {
  InvoiceStatusFromUserView,
  RequestPair,
} from 'src/common/invoice-status'
import { InvoicesTransferService } from './invoices-transfer.service'

@Resolver()
export class InvoicesTransferResolver {
  constructor(private service: InvoicesTransferService) {}

  @UseGuards(AuthorizerGuard)
  @Query((returns) => RequestPair)
  async getRequestPair(
    @CurrentUser() user: AuthUser,
    @Args('invoiceId') invoiceId: string,
  ): Promise<RequestPair> {
    return await this.service.getRequestPair(user.dbUser, invoiceId)
  }

  @UseGuards(AuthorizerGuard)
  @Query((returns) => InvoiceStatusFromUserView)
  async getInvoiceStatusFromUserView(
    @CurrentUser() user: AuthUser,
    @Args('invoiceId') invoiceId: string,
  ): Promise<InvoiceStatusFromUserView> {
    return await this.service.getInvoiceStatusFromUserView(
      user.dbUser,
      invoiceId,
    )
  }
}
