/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql'
import { NewCompanyInput } from './dto/newCompany.input'
import { Company } from './company'
import { CompaniesService } from './companies.service'

@Resolver((of: unknown) => Company)
export class CompaniesResolver {
  constructor(private companiesService: CompaniesService) {}

  @Query((returns) => [Company])
  companies(): Promise<Company[]> {
    return this.companiesService.findAll()
  }

  @Query((returns) => Company)
  async getCompany(@Args({ name: 'id', type: () => Int }) id: number) {
    const company = await this.companiesService.findOneById(id)
    if (!company) {
      throw new NotFoundException(id)
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
