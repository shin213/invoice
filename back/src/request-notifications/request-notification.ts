/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql'
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
  requestComing = 'request_coming',
  requestAccepted = 'request_accepted',
  requestDeclined = 'request_declined',
}

registerEnumType(IsRead, { name: 'IsRead' })
registerEnumType(NotificationRequestType, { name: 'NotificationRequestType' })

@Entity({ name: 'request_notifications' })
@ObjectType()
export class RequestNotification {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id!: number

  @Column({ nullable: false })
  @Field((type) => ID)
  userId!: string

  @ManyToOne((type) => User, (user) => user.requestNotifications, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  @Field((type) => User)
  user!: User

  @Column({ type: 'enum', enum: IsRead })
  @Field((type) => IsRead)
  isRead!: IsRead

  @Column({ type: 'enum', enum: NotificationRequestType })
  @Field((type) => NotificationRequestType)
  type!: NotificationRequestType

  @Column({ nullable: false })
  @Field((type) => Int)
  requestReceiverId!: number

  @ManyToOne(
    (type) => RequestReceiver,
    (requestReceiver) => requestReceiver.requestNotifications,
    { nullable: false },
  )
  @JoinColumn({ name: 'request_receiver_id' })
  @Field((type) => RequestReceiver)
  requestReceiver!: RequestReceiver
}
