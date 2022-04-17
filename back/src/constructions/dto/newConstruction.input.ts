/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, InputType } from '@nestjs/graphql'
import { MaxLength } from 'class-validator'
import { ShownName } from '../construction'

@InputType()
export class NewConstructionInput {
  @Field()
  @MaxLength(256)
  name!: string

  @Field()
  @MaxLength(256)
  code!: string

  @Field((type) => ShownName)
  shownName!: ShownName

  @Field()
  customShownName!: string

  @Field()
  remarks!: string

  @Field((type) => [String])
  userIds!: string[]
}
