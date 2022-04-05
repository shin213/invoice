import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeclineInvoiceInput {
  @Field()
  invoiceId!: string

  @Field()
  comment!: string
}
