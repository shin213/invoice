import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Invoice } from 'src/invoices/invoice'
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

  async invoice(comment_id: number): Promise<Invoice> {
    const comment = await this.commentsRepository.findOne(comment_id, {
      relations: ['invoice'],
    })

    return comment.invoice
  }

  async user(comment_id: number): Promise<User> {
    const comment = await this.commentsRepository.findOne(comment_id, {
      relations: ['user'],
    })

    return comment.user
  }

  async request(comment_id: number): Promise<Request> {
    const comment = await this.commentsRepository.findOne(comment_id, {
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
