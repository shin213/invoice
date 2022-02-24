/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class NewRequestReceiverInput {
  @Field((type) => Int)
  receiverId!: number

  @Field((type) => Int)
  requestId!: number
}
