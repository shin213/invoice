/* eslint-disable @typescript-eslint/no-unused-vars */
import { UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { AdminAuthorizerGuard } from 'src/aws/admin-authorizer/admin-authorizer.guard'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AuthUser } from 'src/aws/cognito/cognito'
import { Company } from 'src/companies/company'
import { AdminNewUnconfirmedUserInput } from './dto/adminNewUnconfirmedUser.input'
import { NewUnconfirmedUserInput } from './dto/newUnconfirmedUser.input'
import { UpdateUnconfirmedUserInput } from './dto/updateUnconfirmedUser.input'
import { UnconfirmedUser } from './unconfirmed-user'
import { UnconfirmedUsersService } from './unconfirmed-users.service'

@Resolver((of: unknown) => UnconfirmedUser)
export class UnconfirmedUsersResolver {
  constructor(private service: UnconfirmedUsersService) {}

  @UseGuards(AdminAuthorizerGuard)
  @Query((returns) => [UnconfirmedUser])
  adminUnconfirmedUsers(): Promise<UnconfirmedUser[]> {
    return this.service.findAll()
  }

  @ResolveField('company')
  async company(@Parent() user: UnconfirmedUser): Promise<Company> {
    return this.service.company(user.email)
  }

  @UseGuards(AdminAuthorizerGuard)
  @Mutation((returns) => UnconfirmedUser)
  adminAddUnconfirmedUser(
    @Args('newUnconfirmedUser') newUser: AdminNewUnconfirmedUserInput,
  ): Promise<UnconfirmedUser> {
    const user = { ...newUser }
    return this.service.create(user)
  }

  @UseGuards(AdminAuthorizerGuard)
  @Mutation((returns) => Boolean)
  async adminRemoveUnconfirmedUser(
    @Args({ name: 'email', type: () => String }) email: string,
  ) {
    return this.service.remove(email)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => UnconfirmedUser)
  addUnconfirmedUser(
    @CurrentUser() currentUser: AuthUser,
    @Args('newUnconfirmedUser') newUser: NewUnconfirmedUserInput,
  ): Promise<UnconfirmedUser> {
    const user = { ...newUser, companyId: currentUser.dbUser.companyId }
    return this.service.create(user)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => UnconfirmedUser)
  updateUnconfirmedUser(
    @CurrentUser() currentUser: AuthUser,
    @Args('updateUnconfirmedUser') updateUser: UpdateUnconfirmedUserInput,
  ): Promise<UnconfirmedUser> {
    return this.service.update(currentUser.dbUser, updateUser)
  }

  @UseGuards(AdminAuthorizerGuard)
  @Mutation((returns) => UnconfirmedUser)
  adminUpdateUnconfirmedUser(
    @CurrentUser() currentUser: AuthUser,
    @Args('updateUnconfirmedUser') updateUser: UpdateUnconfirmedUserInput,
  ): Promise<UnconfirmedUser> {
    return this.service.updateWithoutCheckingCompany(updateUser)
  }
}
