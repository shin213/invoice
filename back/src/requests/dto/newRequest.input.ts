/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class NewRequestInput {
  @Field((type) => Int)
  requesterId: number

  @Field()
  invoiceId: string

  @Field((type) => [Int])
  requestReceiverIds: number[]

  @Field()
  comment: string
}
