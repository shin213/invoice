import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CompleteInvoiceInput {
  @Field()
  requestId!: number
}
