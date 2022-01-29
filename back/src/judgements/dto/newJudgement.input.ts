import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewJudgementInput {
  @Field()
  created_at: Date // TODO: なぜかこれを入れるとerrorが出ない、要調査

  @Field()
  user_id: number

  @Field()
  comment_id: number

  @Field()
  request_id: number
}
