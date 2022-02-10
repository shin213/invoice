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
import { User } from 'src/users/user'
import { Judgement } from './judgement'
import { JudgementsService } from './judgements.service'
import { NewJudgementInput } from './dto/newJudgement.input'
import { Request } from 'src/requests/request'

@Resolver((of) => Judgement)
export class JudgementsResolver {
  constructor(private judgementsService: JudgementsService) {}

  @Query((returns) => [Judgement])
  judgements(): Promise<Judgement[]> {
    return this.judgementsService.findAll()
  }

  @Query((returns) => Judgement)
  async getJudgement(@Args({ name: 'id', type: () => Int }) id: number) {
    const judgement = await this.judgementsService.findOneById(id)
    if (!judgement) {
      throw new NotFoundException(id)
    }
    return judgement
  }

  @ResolveField('user')
  async user(@Parent() judgement: Judgement): Promise<User> {
    return this.judgementsService.user(judgement.id)
  }

  @ResolveField('request')
  async request(@Parent() judgement: Judgement): Promise<Request> {
    return this.judgementsService.request(judgement.id)
  }

  @Mutation((returns) => Judgement)
  addJudgement(
    @Args('newJudgement') newJudgement: NewJudgementInput,
  ): Promise<Judgement> {
    return this.judgementsService.create(newJudgement)
  }

  // @Mutation((returns) => Boolean)
  // async removeJudgement(@Args({ name: 'id', type: () => Int }) id: number) {
  //   return this.judgementsService.remove(id)
  // }
}
