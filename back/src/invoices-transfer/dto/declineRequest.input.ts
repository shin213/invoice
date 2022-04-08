import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class DeclineRequestInput {
  @Field()
  requestId!: number

  @Field()
  comment!: string
}
