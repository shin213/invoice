/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType } from '@nestjs/graphql'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { Company } from 'src/companies/company'
import { User } from 'src/users/user'
import { Request } from 'src/requests/request'

@Entity({ name: 'request_receiver' })
@ObjectType()
export class RequestReceiver {
  @PrimaryGeneratedColumn()
  @Field((type) => ID)
  id: number

  @ManyToOne((type) => Request, (request) => request.request_receivers)
  @JoinColumn({ name: 'request_id' })
  @Field((type) => Request)
  request: Request

  @ManyToOne((type) => User, (receiver) => receiver.request_receivers)
  @JoinColumn({ name: 'receiver_id' })
  @Field((type) => User)
  receiver: User
}
