import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ApproveInvoiceInput {
  @Field()
  invoiceId!: string

  @Field()
  requestId!: number

  @Field()
  receiverIds!: string[]

  @Field()
  comment!: string
}
