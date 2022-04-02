/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType } from '@nestjs/graphql'

@InputType()
export class NewRequestInput {
  @Field((type) => ID)
  requesterId!: string

  @Field()
  invoiceId!: string

  @Field((type) => [ID])
  requestReceiverIds!: string[]

  @Field()
  comment!: string
}
