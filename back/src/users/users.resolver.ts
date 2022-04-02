/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, UseGuards } from '@nestjs/common'
import {
  Args,
  ID,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { NewUserInput } from './dto/newUser.input'
import { User } from './user'
import { UsersService } from './users.service'
import { Company } from 'src/companies/company'
import { UnconfirmedUser } from 'src/unconfirmed-users/unconfirmed-user'
import { AdminAuthorizerGuard } from 'src/aws/admin-authorizer/admin-authorizer.guard'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthUser } from 'src/aws/cognito/cognito'

@Resolver((of: unknown) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @UseGuards(AdminAuthorizerGuard)
  @Query((returns) => [User])
  allUsers(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @UseGuards(AuthorizerGuard)
  @Query((returns) => [User])
  users(@CurrentUser() user: AuthUser): Promise<User[]> {
    return this.usersService.findByCompany(user.dbUser.companyId)
  }

  // @Query((returns) => User)
  // async getUser(@Args({ name: 'id', type: () => ID }) id: string) {
  //   const user = await this.usersService.findOneById(id)
  //   if (!user) {
  //     throw new NotFoundException(id)
  //   }
  //   return user
  // }

  @Query((returns) => UnconfirmedUser)
  async getUnconfirmedUser(
    @Args({ name: 'email', type: () => String }) email: string,
  ): Promise<UnconfirmedUser> {
    const user = await this.usersService.checkUserUnconfirmed(email)
    return user
  }

  @ResolveField('company')
  async company(@Parent() user: User): Promise<Company> {
    return this.usersService.company(user.id)
  }

  // @Mutation((returns) => Boolean)
  // async removeUser(@Args({ name: 'id', type: () => ID }) id: string) {
  //   return this.usersService.remove(id)
  // }
}
