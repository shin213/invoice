import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewJudgementInput {
  @Field()
  user_id: number

  @Field()
  comment_id: number

  @Field()
  request_id: number
}
