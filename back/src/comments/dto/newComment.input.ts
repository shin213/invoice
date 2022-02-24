/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class NewCommentInput {
  @Field()
  content!: string

  @Field()
  invoiceId!: string

  @Field((type) => Int)
  userId!: number

  @Field((type) => Int)
  requestId!: number

  judgementId?: number
}
