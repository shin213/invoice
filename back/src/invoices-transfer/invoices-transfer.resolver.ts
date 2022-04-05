/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Mutation, ResolveField, Parent } from '@nestjs/graphql'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AuthUser } from 'src/aws/cognito/cognito'
import {
  InvoiceStatusFromUserView,
  RequestPairStatus,
} from 'src/common/invoice-status'
import { Invoice } from 'src/invoices/invoice'
import { Request } from 'src/requests/request'
import { ApproveRequestInput } from './dto/approveRequest.input'
import { CompleteInvoiceInput } from './dto/completeInvoice.input'
import { DeclineInvoiceInput } from './dto/declineInvoice.input'
import { DeclineRequestInput } from './dto/declineRequest.input'
import { ReapplyRequestInput } from './dto/reapplyRequest.input'
import { ReceiveInvoiceInput } from './dto/receiveInvoice.input'
import { SendInvoiceInput } from './dto/sendInvoice.input'
import { InvoicesTransferService } from './invoices-transfer.service'

@Resolver((of: unknown) => RequestPairStatus)
export class InvoicesTransferResolver {
  constructor(private service: InvoicesTransferService) {}

  // RequestPairStatus の resolver は別のクラスに分けたほうが良い説
  // DataLoader タスクの時に考える。
  @ResolveField('invoiceStatusFromUserView')
  invoiceStatusFromUserView(
    @Parent() requestPairStatus: RequestPairStatus,
  ): InvoiceStatusFromUserView {
    return this.service.getInvoiceStatusFromUserView(requestPairStatus)
  }

  // 請求書を送信する
  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Invoice)
  sendInvoice(
    @CurrentUser() user: AuthUser,
    @Args('input') input: SendInvoiceInput,
  ): Promise<Invoice> {
    return this.service.send(user.dbUser, input)
  }

  // 受領する
  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Invoice)
  receiveInvoice(
    @CurrentUser() user: AuthUser,
    @Args('input') input: ReceiveInvoiceInput,
  ) {
    return this.service.receive(user.dbUser, input)
  }

  // 受領を差し戻す
  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Invoice)
  declineInvoiceToInput(
    @CurrentUser() user: AuthUser,
    @Args('input') input: DeclineInvoiceInput,
  ): Promise<Invoice> {
    return this.service.declineToInput(user.dbUser, input)
  }

  // 承認リクエストを承認する
  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Request)
  approveRequest(
    @CurrentUser() user: AuthUser,
    @Args('input') input: ApproveRequestInput,
  ): Promise<Request> {
    return this.service.approve(user.dbUser, input)
  }

  // 承認リクエストを差し戻す
  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Boolean)
  declineRequest(
    @CurrentUser() user: AuthUser,
    @Args('input') input: DeclineRequestInput,
  ): Promise<boolean> {
    return this.service.decline(user.dbUser, input)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Boolean)
  reapplyRequest(
    @CurrentUser() user: AuthUser,
    @Args('input') input: ReapplyRequestInput,
  ): Promise<boolean> {
    return this.service.reapply(user.dbUser, input)
  }

  // 最終承認する
  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Invoice)
  completeInvoice(
    @CurrentUser() user: AuthUser,
    @Args('input') input: CompleteInvoiceInput,
  ): Promise<Invoice> {
    return this.service.complete(user.dbUser, input)
  }
}
