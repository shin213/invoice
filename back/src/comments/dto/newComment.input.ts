/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, InputType, Int } from '@nestjs/graphql'

@InputType()
export class NewCommentInput {
  @Field()
  content!: string

  @Field()
  invoiceId!: string

  @Field((type) => ID)
  userId!: string

  @Field((type) => Int)
  requestId!: number

  judgementId?: number
}
