/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common'
import { Args, Resolver, Query } from '@nestjs/graphql'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AuthUser } from 'src/aws/cognito/cognito'
import { InvoicesTransferService } from './invoices-transfer.service'

@Resolver()
export class InvoicesTransferResolver {
  constructor(private service: InvoicesTransferService) {}

  @UseGuards(AuthorizerGuard)
  @Query((returns) => String)
  async getInvoiceStatusFromUserView(
    @CurrentUser() user: AuthUser,
    @Args('invoiceId') invoiceId: string,
  ) {
    return await this.service.getInvoiceStatusFromUserView(
      user.dbUser.id,
      user.dbUser.companyId,
      invoiceId,
    )
  }
}
