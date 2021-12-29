/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@InputType()
export class NewUserInput {
  @Field()
  @MaxLength(256)
  email: string

  @Field()
  @MaxLength(256)
  name: string
}
