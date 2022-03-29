/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'
import { Prefecture } from 'src/common/prefecture'

@InputType()
export class NewCompanyInput {
  @Field()
  @MaxLength(256)
  name!: string

  @Field()
  @MaxLength(50)
  phoneNumber!: string

  @Field()
  @MaxLength(50)
  postalCode!: string

  @Field((type) => Prefecture, { nullable: true })
  prefecture: Prefecture | null = null

  @Field()
  @MaxLength(256)
  city!: string

  @Field()
  @MaxLength(256)
  restAddress!: string
}
