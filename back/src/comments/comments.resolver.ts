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
import { Invoice } from 'src/invoices/invoice'
import { Judgement } from 'src/judgements/judgement'
import { Request } from 'src/requests/request'
import { User } from 'src/users/user'
import { Comment } from './comment'
import { CommentsService } from './comments.service'
import { NewCommentInput } from './dto/newComment.input'

@Resolver((of) => Comment)
export class CommentsResolver {
  constructor(private commentsService: CommentsService) {}

  @Query((returns) => [Comment])
  comments(): Promise<Comment[]> {
    return this.commentsService.findAll()
  }

  @Query((returns) => Comment)
  async getComment(@Args({ name: 'id', type: () => Int }) id: number) {
    const comment = await this.commentsService.findOneById(id)
    if (!comment) {
      throw new NotFoundException(id)
    }
    return comment
  }

  @ResolveField('invoice')
  async invoice(@Parent() comment: Comment): Promise<Invoice> {
    return this.commentsService.invoice(comment.id)
  }

  @ResolveField('judgement')
  async judgement(@Parent() comment: Comment): Promise<Judgement> {
    return this.commentsService.judgement(comment.id)
  }

  @ResolveField('user')
  async user(@Parent() comment: Comment): Promise<User> {
    return this.commentsService.user(comment.id)
  }

  @ResolveField('request')
  async request(@Parent() comment: Comment): Promise<Request> {
    return this.commentsService.request(comment.id)
  }

  @Mutation((returns) => Comment)
  addComment(
    @Args('newComment') newComment: NewCommentInput,
  ): Promise<Comment> {
    return this.commentsService.create(newComment)
  }

  @Mutation((returns) => Boolean)
  async removeComment(@Args({ name: 'id', type: () => Int }) id: number) {
    return this.commentsService.remove(id)
  }
}
