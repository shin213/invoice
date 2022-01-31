import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from 'src/comments/comment'
import { CommentsService } from 'src/comments/comments.service'
import { Request } from 'src/requests/request'
import { RequestsService } from 'src/requests/requests.service'
import { User } from 'src/users/user'
import { UsersService } from 'src/users/users.service'
import { Repository } from 'typeorm'
import { NewJudgementInput } from './dto/newJudgement.input'
import { Judgement } from './judgement'

@Injectable()
export class JudgementsService {
  constructor(
    @InjectRepository(Judgement)
    private judgementsRepository: Repository<Judgement>,
    private usersService: UsersService,
    private requestsService: RequestsService,
    private commentsService: CommentsService,
  ) {}

  findAll(): Promise<Judgement[]> {
    return this.judgementsRepository.find()
  }

  findOneById(id: number): Promise<Judgement> {
    return this.judgementsRepository.findOne(id)
  }

  async user(judgement_id: number): Promise<User> {
    const judgement = await this.judgementsRepository.findOne(judgement_id, {
      relations: ['user'],
    })

    return judgement.user
  }

  async comment(judgement_id: number): Promise<Comment> {
    const judgement = await this.judgementsRepository.findOne(judgement_id, {
      relations: ['comment'],
    })

    return judgement.comment
  }

  async request(judgement_id: number): Promise<Request> {
    const judgement = await this.judgementsRepository.findOne(judgement_id, {
      relations: ['request'],
    })

    return judgement.request
  }

  async create(data: NewJudgementInput): Promise<Judgement> {
    const judgement = this.judgementsRepository.create(data)

    judgement.user = await this.usersService.findOneById(data.user_id)
    judgement.comment = await this.commentsService.findOneById(data.comment_id)
    judgement.request = await this.requestsService.findOneById(data.request_id)

    await this.judgementsRepository.save(judgement)
    return judgement
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.judgementsRepository.delete(id)
    return result.affected > 0
  }
}
