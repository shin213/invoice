/* eslint-disable @typescript-eslint/no-unused-vars */
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { FileUpload, GraphQLUpload } from 'graphql-upload'

@Resolver()
export class InvoiceFileResolver {
  @Mutation((returns) => Boolean)
  async uploadInvoiceFile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    console.log(file)
    return true
  }
}
