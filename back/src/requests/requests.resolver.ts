/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException } from '@nestjs/common'
import {
  Args,
  Resolver,
  Query,
  Int,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql'
import { Company } from 'src/companies/company'
import { Invoice } from 'src/invoices/invoice'
import { User } from 'src/users/user'
import { NewRequestInput } from './dto/newRequest.input'
import { Request } from './request'
import { RequestsService } from './requests.service'

@Resolver((of) => Request)
export class RequestsResolver {
  constructor(private requestsService: RequestsService) {}

  @Query((returns) => [Request])
  requests(): Promise<Request[]> {
    return this.requestsService.findAll()
  }

  @Query((returns) => Request)
  async getRequest(@Args({ name: 'id', type: () => Int }) id: number) {
    const request = await this.requestsService.findOneById(id)
    if (!request) {
      throw new NotFoundException(id)
    }
    return request
  }

  @ResolveField('requester')
  async requester(@Parent() request: Request): Promise<User> {
    return this.requestsService.requester(request.id)
  }

  @ResolveField('invoice')
  async invoice(@Parent() request: Request): Promise<Invoice> {
    return this.requestsService.invoice(request.id)
  }

  @ResolveField('company')
  async company(@Parent() request: Request): Promise<Company> {
    return this.requestsService.company(request.id)
  }

  @Mutation((returns) => Request)
  addRequest(@Args('newRequest') newRequest: NewRequestInput) {
    return this.requestsService.create(newRequest)
  }

  // @Mutation((returns) => Boolean)
  // async removeRequest(@Args({ name: 'id', type: () => Int }) id: number) {
  //   return this.requestsService.remove(id)
  // }
}
