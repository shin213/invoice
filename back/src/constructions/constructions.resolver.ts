/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AuthUser } from 'src/aws/cognito/cognito'
import { Construction } from './construction'
import { ConstructionsService } from './constructions.service'
import { NewConstructionInput } from './dto/newConstruction.input'

@Resolver()
export class ConstructionsResolver {
  constructor(private service: ConstructionsService) {}

  @UseGuards(AuthorizerGuard)
  @Query((returns) => [Construction])
  constructions(@CurrentUser() user: AuthUser): Promise<Construction[]> {
    return this.service.findByCompany(user.dbUser.companyId)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => Construction)
  addConstruction(
    @CurrentUser() user: AuthUser,
    @Args('newConstruction') newConstruction: NewConstructionInput,
  ): Promise<Construction> {
    return this.service.create(newConstruction, user.dbUser.companyId)
  }
}
