/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AuthUser } from 'src/aws/cognito/cognito'
import { InvoiceFileService } from './invoice-file.service'

@Resolver()
export class InvoiceFileResolver {
  constructor(private service: InvoiceFileService) {}

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Boolean)
  async uploadInvoiceFile(
    @CurrentUser() user: AuthUser,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    console.log(file)
    this.service.uploadFile(user.dbUser.companyId, file)
    return true
  }
}
