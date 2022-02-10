/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class NewRequestReceiverInput {
  @Field((type) => Int)
  receiver_id: number

  @Field((type) => Int)
  request_id: number
}
