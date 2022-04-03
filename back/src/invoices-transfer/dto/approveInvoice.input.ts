import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ApproveInvoiceInput {
  @Field()
  requestId!: number

  @Field()
  receiverIds!: string[]

  @Field()
  comment!: string
}
