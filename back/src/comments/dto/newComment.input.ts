import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewCommentInput {
  @Field()
  content: string

  @Field()
  invoice_id: number

  @Field()
  user_id: number

  @Field()
  request_id: number
}
