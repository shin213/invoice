import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReceiveInvoiceInput {
  @Field()
  invoiceId!: string

  // TODO: add companyId

  @Field()
  comment!: string
}
