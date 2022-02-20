import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Invoice } from 'src/invoices/invoice'
import { Judgement } from 'src/judgements/judgement'
import { Request } from 'src/requests/request'
import { User } from 'src/users/user'
import { Repository } from 'typeorm'
import { Comment } from './comment'
import { NewCommentInput } from './dto/newComment.input'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
  ) {}

  findAll(): Promise<Comment[]> {
    return this.commentsRepository.find()
  }

  findOneById(id: number): Promise<Comment> {
    return this.commentsRepository.findOne(id)
  }

  where(where: Partial<Comment>): Promise<Comment[]> {
    return this.commentsRepository.find({ where })
  }

  async invoice(commentId: number): Promise<Invoice> {
    const comment = await this.commentsRepository.findOne(commentId, {
      relations: ['invoice'],
    })

    return comment.invoice
  }

  async judgement(commentId: number): Promise<Judgement> {
    const comment = await this.commentsRepository.findOne(commentId, {
      relations: ['judgement'],
    })

    return comment.judgement
  }

  async user(commentId: number): Promise<User> {
    const comment = await this.commentsRepository.findOne(commentId, {
      relations: ['user'],
    })

    return comment.user
  }

  async request(commentId: number): Promise<Request> {
    const comment = await this.commentsRepository.findOne(commentId, {
      relations: ['request'],
    })

    return comment.request
  }

  async create(data: NewCommentInput): Promise<Comment> {
    const comment = this.commentsRepository.create(data)

    await this.commentsRepository.save(comment)
    return comment
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.commentsRepository.delete(id)
    return result.affected > 0
  }
}
