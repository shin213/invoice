/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Query, Mutation } from '@nestjs/graphql'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AuthUser } from 'src/aws/cognito/cognito'
import {
  InvoiceStatusFromUserView,
  RequestPair,
} from 'src/common/invoice-status'
import { Invoice } from 'src/invoices/invoice'
import { Request } from 'src/requests/request'
import { ApproveInvoiceInput } from './dto/approveInvoice.input'
import { DeclineRequestInput } from './dto/declineRequest.input'
import { HandleRequestInput } from './dto/handleInvoice.input'
import { ReceiveInvoiceInput } from './dto/receiveInvoice.input'
import { InvoicesTransferService } from './invoices-transfer.service'

@Resolver()
export class InvoicesTransferResolver {
  constructor(private service: InvoicesTransferService) {}

  @UseGuards(AuthorizerGuard)
  @Query((returns) => RequestPair)
  getRequestPair(
    @CurrentUser() user: AuthUser,
    @Args('invoiceId') invoiceId: string,
  ): Promise<RequestPair> {
    return this.service.getRequestPair(user.dbUser, invoiceId)
  }

  @UseGuards(AuthorizerGuard)
  @Query((returns) => InvoiceStatusFromUserView)
  getInvoiceStatusFromUserView(
    @CurrentUser() user: AuthUser,
    @Args('invoiceId') invoiceId: string,
  ): Promise<InvoiceStatusFromUserView> {
    return this.service.getInvoiceStatusFromUserView(user.dbUser, invoiceId)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Invoice)
  receive(
    @CurrentUser() user: AuthUser,
    @Args('input') input: ReceiveInvoiceInput,
  ): Promise<Invoice> {
    return this.service.receive(user.dbUser, input)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Request)
  approve(
    @CurrentUser() user: AuthUser,
    @Args('approveInput') approveInput: ApproveInvoiceInput,
  ): Promise<Request> {
    return this.service.approve(user.dbUser, approveInput)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Boolean)
  decline(
    @CurrentUser() user: AuthUser,
    @Args('declineInput') declineInput: DeclineRequestInput,
  ): Promise<boolean> {
    return this.service.decline(user.dbUser, declineInput)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Boolean)
  handle(
    @CurrentUser() user: AuthUser,
    @Args('handleInput') handleInput: HandleRequestInput,
  ): Promise<boolean> {
    return this.service.handle(user.dbUser, handleInput)
  }
}
