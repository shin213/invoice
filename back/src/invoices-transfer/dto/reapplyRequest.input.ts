import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ReapplyRequestInput {
  @Field()
  requestId!: number

  @Field()
  comment!: string
}
