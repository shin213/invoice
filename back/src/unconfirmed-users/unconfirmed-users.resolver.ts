/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { AdminAuthorizerGuard } from 'src/aws/admin-authorizer/admin-authorizer.guard'
import { Company } from 'src/companies/company'
import { NewUnconfirmedUserInput } from './dto/newUnconfirmedUser.input'
import { UnconfirmedUser } from './unconfirmed-user'
import { UnconfirmedUsersService } from './unconfirmed-users.service'

@Resolver((of: unknown) => UnconfirmedUser)
export class UnconfirmedUsersResolver {
  constructor(private unconfirmedUsersService: UnconfirmedUsersService) {}

  @UseGuards(AdminAuthorizerGuard)
  @Query((returns) => [UnconfirmedUser])
  unconfirmedUsers(): Promise<UnconfirmedUser[]> {
    return this.unconfirmedUsersService.findAll()
  }

  @ResolveField('company')
  async company(@Parent() user: UnconfirmedUser): Promise<Company> {
    return this.unconfirmedUsersService.company(user.email)
  }

  @Mutation((returns) => UnconfirmedUser)
  addUnconfirmedUser(
    @Args('newUnconfirmedUser') newUser: NewUnconfirmedUserInput,
  ): Promise<UnconfirmedUser> {
    const user = { ...newUser }
    return this.unconfirmedUsersService.create(user)
  }

  @Mutation((returns) => Boolean)
  async removeUnconfirmedUser(
    @Args({ name: 'email', type: () => String }) email: string,
  ) {
    return this.unconfirmedUsersService.remove(email)
  }
}