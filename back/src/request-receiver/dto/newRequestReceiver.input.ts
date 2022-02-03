import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class NewRequestReceiverInput {
  @Field()
  receiver_id: number

  @Field()
  request_id: number
}
