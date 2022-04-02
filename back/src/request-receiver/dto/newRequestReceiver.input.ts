/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType()
export class NewRequestReceiverInput {
  @Field((type) => ID)
  receiverId!: string

  @Field((type) => Int)
  requestId!: number
}
