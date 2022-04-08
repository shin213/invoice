import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class SendInvoiceInput {
  @Field()
  invoiceId!: string

  // TODO: add companyId

  @Field()
  comment!: string
}
