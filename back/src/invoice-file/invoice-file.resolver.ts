/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'

@Resolver()
export class InvoiceFileResolver {
  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Boolean)
  async uploadInvoiceFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    console.log(file)
    return true
  }
}
