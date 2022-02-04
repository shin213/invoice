import { Field, InputType } from '@nestjs/graphql'
import { IsRead, NotificationRequestType } from '../request-notification'

@InputType()
export class NewRequestNotificationInput {
  @Field()
  user_id: number

  @Field()
  is_read: IsRead

  @Field()
  type: NotificationRequestType

  @Field()
  request_receiver_id: number
}
