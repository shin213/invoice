/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AuthUser } from 'src/aws/cognito/cognito'
import { InvoiceFile } from './invoice-file'
import { InvoiceFileService } from './invoice-file.service'

@Resolver()
export class InvoiceFileResolver {
  constructor(private service: InvoiceFileService) {}

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => InvoiceFile)
  async uploadInvoiceFile(
    @CurrentUser() user: AuthUser,
    @Args({ name: 'invoiceId', type: () => String }) invoiceId: string,
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ): Promise<InvoiceFile> {
    console.log(file)
    return await this.service.uploadFile(user.dbUser, invoiceId, file)
  }
}
