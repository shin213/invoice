import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentsService } from 'src/comments/comments.service'
import { Request } from 'src/requests/request'
import { User } from 'src/users/user'
import { Repository } from 'typeorm'
import { NewJudgementInput } from './dto/newJudgement.input'
import { Judgement } from './judgement'

@Injectable()
export class JudgementsService {
  constructor(
    @InjectRepository(Judgement)
    private judgementsRepository: Repository<Judgement>,
    private commentService: CommentsService,
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

  async request(judgement_id: number): Promise<Request> {
    const judgement = await this.judgementsRepository.findOne(judgement_id, {
      relations: ['request'],
    })

    return judgement.request
  }

  async create(input: NewJudgementInput): Promise<Judgement> {
    // TODO: 企業の判定
    // TODO: 承認権限があるかどうかの判定
    // TODO: 最終承認への対応
    // 承認リクエストされているかの判定はやらない
    const data = {
      ...input,
    }
    delete data.comment
    const judgement = await this.judgementsRepository.save(data)

    const request = await this.request(judgement.id)

    await this.commentService.create({
      content: input.comment,
      request_id: input.request_id,
      user_id: input.user_id,
      invoice_id: request.invoice_id,
      judgement_id: judgement.id,
    })

    return judgement
  }

  // async remove(id: number): Promise<boolean> {
  //   const result = await this.judgementsRepository.delete(id)
  //   return result.affected > 0
  // }
}
