import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Invoice } from 'src/invoices/invoice'
import { InvoicesService } from 'src/invoices/invoices.service'
import { Request } from 'src/requests/request'
import { RequestsService } from 'src/requests/requests.service'
import { User } from 'src/users/user'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { Comment } from './comment'
import { NewCommentInput } from './dto/newComment.input'

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private invoicesService: InvoicesService,
    private usersService: UsersService,
    private requestsService: RequestsService,
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

    comment.invoice = await this.invoicesService.findOneById(data.invoice_id)
    comment.user = await this.usersService.findOneById(data.user_id)
    comment.request = await this.requestsService.findOneById(data.request_id)

    await this.commentsRepository.save(comment)
    return comment
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.commentsRepository.delete(id)
    return result.affected > 0
  }
}
