/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveProperty,
  Resolver,
} from '@nestjs/graphql'
import { NewUserInput } from './dto/newUser.input'
import { User } from './user'
import { UsersService } from './users.service'
import { Company } from 'src/companies/company'

@Resolver((of) => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  // @Query((returns) => [User])
  // users(): Promise<User[]> {
  //   return this.usersService.findAll()
  // }

  @Query((returns) => [User])
  users(
    @Args({ name: 'company_id', type: () => Int }) company_id: number,
  ): Promise<User[]> {
    return this.usersService.findByCompany(company_id)
  }

  @Query((returns) => User)
  async getUser(@Args({ name: 'id', type: () => Int }) id: number) {
    const user = await this.usersService.findOneById(id)
    if (!user) {
      throw new NotFoundException(id)
    }
    return user
  }

  @ResolveProperty('company')
  async company(@Parent() user: User): Promise<Company> {
    return await this.usersService.company(user.company_id)
  }

  @Mutation((returns) => User)
  addUser(@Args('newUser') newUser: NewUserInput): Promise<User> {
    return this.usersService.create(newUser)
  }

  @Mutation((returns) => Boolean)
  async removeUser(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.usersService.remove(id)
  }
}
