/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType, Int } from '@nestjs/graphql'
import { IsRead, NotificationRequestType } from '../request-notification'

@InputType()
export class NewRequestNotificationInput {
  @Field((type) => Int)
  user_id: number

  @Field()
  is_read: IsRead

  @Field()
  type: NotificationRequestType

  @Field((type) => Int)
  request_receiver_id: number
}
