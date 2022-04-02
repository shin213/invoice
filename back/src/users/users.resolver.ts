/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
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

@Resolver((of: unknown) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query((returns) => [User])
  users(): Promise<User[]> {
    return this.usersService.findAll()
  }

  @Query((returns) => User)
  async getUser(@Args({ name: 'id', type: () => ID }) id: string) {
    const user = await this.usersService.findOneById(id)
    if (!user) {
      throw new NotFoundException(id)
    }
    return user
  }

  @Query((returns) => UnconfirmedUser)
  async getUnconfirmedUser(
    @Args({ name: 'email', type: () => String }) email: string,
  ) {
    const user = await this.usersService.checkUserUnconfirmed(email)
    return user
  }

  @ResolveField('company')
  async company(@Parent() user: User): Promise<Company> {
    return this.usersService.company(user.id)
  }

  @Mutation((returns) => User)
  addUser(@Args('newUser') newUser: NewUserInput): Promise<User> {
    return this.usersService.create(newUser)
  }

  @Mutation((returns) => Boolean)
  async removeUser(@Args({ name: 'id', type: () => ID }) id: string) {
    return this.usersService.remove(id)
  }
}
