/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class NewRequestInput {
  @Field((type) => Int)
  requester_id: number

  @Field()
  invoice_id: string

  @Field((type) => [Int])
  request_receiver_ids: number[]

  @Field()
  comment: string
}
