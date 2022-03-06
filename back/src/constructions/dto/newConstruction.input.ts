/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@InputType()
export class NewConstructionInput {
  @Field()
  @MaxLength(50)
  name!: string

  @Field()
  @MaxLength(50)
  code: string | null = null
}
