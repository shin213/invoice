/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, ID, ObjectType, Int } from '@nestjs/graphql'

@ObjectType()
export class User {
  @Field((type) => ID)
  id: number

  @Field()
  email: string

  @Field()
  name: string

  @Field((type) => Int)
  isAdmin: number

  @Field()
  createdAt: Date
}
