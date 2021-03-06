/* eslint-disable @typescript-eslint/no-unused-vars */
import { NotFoundException, UseGuards } from '@nestjs/common'
import { Args, Resolver, Mutation, ResolveField, Parent } from '@nestjs/graphql'
import { CurrentUser } from 'src/aws/authorizer/authorizer.decorator'
import { AuthorizerGuard } from 'src/aws/authorizer/authorizer.guard'
import { AuthUser } from 'src/aws/cognito/cognito'
import { Request } from 'src/requests/request'
import { User } from 'src/users/user'
import { NewRequestReceiverInput } from './dto/newRequestReceiver.input'
import { RequestReceiver } from './request-receiver'
import { RequestReceiverService } from './request-receiver.service'

@Resolver((of: unknown) => RequestReceiver)
export class RequestReceiverResolver {
  constructor(private requestReceiversService: RequestReceiverService) {}

  // @Query((returns) => [RequestReceiver])
  // requestReceivers(): Promise<RequestReceiver[]> {
  //   return this.requestReceiversService.findAll()
  // }

  // @Query((returns) => RequestReceiver)
  // async requestReceiver(@Args({ name: 'id', type: () => Int }) id: number) {
  //   const requestReceiver = await this.requestReceiversService.findOneById(id)
  //   if (!requestReceiver) {
  //     throw new NotFoundException(id)
  //   }
  //   return requestReceiver
  // }

  @ResolveField('request')
  async request(@Parent() requestReceiver: RequestReceiver): Promise<Request> {
    return this.requestReceiversService.request(requestReceiver.id)
  }

  @ResolveField('receiver')
  async receiver(@Parent() requestReceiver: RequestReceiver): Promise<User> {
    return this.requestReceiversService.receiver(requestReceiver.id)
  }

  @UseGuards(AuthorizerGuard)
  @Mutation((returns) => RequestReceiver)
  addRequestReceiver(
    @CurrentUser() user: AuthUser,
    @Args('newRequestReceiver') newRequestReceiver: NewRequestReceiverInput,
  ): Promise<RequestReceiver> {
    // TODO: check userIds
    return this.requestReceiversService.create(newRequestReceiver)
  }

  // @Mutation((returns) => Boolean)
  // async removeRequestReceiver(
  //   @Args({ name: 'id', type: () => Int }) id: number,
  // ) {
  //   return this.requestReceiversService.remove(id)
  // }
}
