/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common'
import {
  Args,
  Resolver,
  Query,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AuthUser } from 'src/aws/cognito/cognito'
import {
  InvoiceStatusFromUserView,
  RequestPair,
  RequestPairStatus,
} from 'src/common/invoice-status'
import { Invoice } from 'src/invoices/invoice'
import { Request } from 'src/requests/request'
import { ApproveInvoiceInput } from './dto/approveInvoice.input'
import { DeclineRequestInput } from './dto/declineRequest.input'
import { HandleRequestInput } from './dto/handleInvoice.input'
import { SendInvoiceInput } from './dto/sendInvoice.input'
import { InvoicesTransferService } from './invoices-transfer.service'

@Resolver((of: unknown) => RequestPairStatus)
export class InvoicesTransferResolver {
  constructor(private service: InvoicesTransferService) {}

  @UseGuards(AuthorizerGuard)
  @Query((returns) => RequestPairStatus)
  getRequestPair(
    @CurrentUser() user: AuthUser,
    @Args('invoiceId') invoiceId: string,
  ): Promise<RequestPairStatus> {
    return this.service.getRequestPair(user.dbUser, invoiceId)
  }

  @ResolveField('invoiceStatusFromUserView')
  invoiceStatusFromUserView(
    @Parent() requestPairStatus: RequestPairStatus,
  ): InvoiceStatusFromUserView {
    return this.service.getInvoiceStatusFromUserView(requestPairStatus)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Invoice)
  sendInvoice(
    @CurrentUser() user: AuthUser,
    @Args('input') input: SendInvoiceInput,
  ): Promise<Invoice> {
    return this.service.send(user.dbUser, input)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Request)
  approveInvoice(
    @CurrentUser() user: AuthUser,
    @Args('input') input: ApproveInvoiceInput,
  ): Promise<Request> {
    return this.service.approve(user.dbUser, input)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Boolean)
  declineInvoice(
    @CurrentUser() user: AuthUser,
    @Args('input') input: DeclineRequestInput,
  ): Promise<boolean> {
    return this.service.decline(user.dbUser, input)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Boolean)
  handleInvoice(
    @CurrentUser() user: AuthUser,
    @Args('input') input: HandleRequestInput,
  ): Promise<boolean> {
    return this.service.handle(user.dbUser, input)
  }
}
