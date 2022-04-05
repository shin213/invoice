import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReceiveInvoiceInput {
  @Field()
  invoiceId!: string

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field((type) => [String])
  nextReceiverIds!: string[]

  @Field()
  comment!: string
}
