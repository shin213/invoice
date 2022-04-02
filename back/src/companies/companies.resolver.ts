/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NewCompanyInput } from './dto/newCompany.input'
import { Company } from './company'
import { CompaniesService } from './companies.service'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AdminAuthorizerGuard } from 'src/aws/admin-authorizer/admin-authorizer.guard'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthUser } from 'src/aws/cognito/cognito'

@Resolver((of: unknown) => Company)
export class CompaniesResolver {
  constructor(private companiesService: CompaniesService) {}

  @UseGuards(AdminAuthorizerGuard)
  @Query((returns) => [Company])
  companies(): Promise<Company[]> {
    return this.companiesService.findAll()
  }

  @UseGuards(AdminAuthorizerGuard)
  @Query((returns) => Company)
  async getAnyCompany(@Args({ name: 'id', type: () => Int }) id: number) {
    const company = await this.companiesService.findOneById(id)
    if (!company) {
      throw new NotFoundException(id)
    }
    return company
  }

  @UseGuards(AuthorizerGuard)
  @Query((returns) => Company)
  async getCompany(@CurrentUser() user: AuthUser) {
    const company = await this.companiesService.findOneById(
      user.dbUser.companyId,
    )
    if (!company) {
      throw new NotFoundException(user.dbUser.companyId)
    }
    return company
  }

  @Mutation((returns) => Company)
  addCompany(
    @Args('newCompany') newCompany: NewCompanyInput,
  ): Promise<Company> {
    return this.companiesService.create(newCompany)
  }

  @Mutation((returns) => Boolean)
  async removeCompany(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.companiesService.remove(id)
  }
}
