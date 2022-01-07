/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'

@InputType()
export class NewCompanyInput {
  @Field()
  @MaxLength(50)
  name: string
}
