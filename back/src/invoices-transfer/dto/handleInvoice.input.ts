import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class HandleRequestInput {
  @Field()
  requestId!: number

  @Field()
  comment!: string
}
