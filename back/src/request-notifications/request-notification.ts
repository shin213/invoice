/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { RequestReceiver } from 'src/request-receiver/request-receiver'
import { User } from 'src/users/user'

export enum IsRead {
  read = 'read',
  unread = 'unread',
}

export enum NotificationRequestType {
  request_coming = 'request_coming',
  request_accepted = 'request_accepted',
  request_declined = 'request_declined',
}

@Entity({ name: 'request_notifications' })
@ObjectType()
export class RequestNotification {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @ManyToOne((type) => User, (user) => user.request_notifications)
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user: User

  @Column({ type: 'enum', enum: IsRead })
  @Field((type) => IsRead)
  is_read: IsRead

  @Column({ type: 'enum', enum: NotificationRequestType })
  @Field((type) => NotificationRequestType)
  type: NotificationRequestType

  @ManyToOne(
    (type) => RequestReceiver,
    (request_receiver) => request_receiver.request_notifications,
  )
  @JoinColumn({ name: 'request_receiver_id' })
  @Field((type) => RequestReceiver)
  request_receiver: RequestReceiver
}
