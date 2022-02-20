import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CommentsService } from 'src/comments/comments.service'
import { Request, RequestStatus } from 'src/requests/request'
import { RequestsService } from 'src/requests/requests.service'
import { User } from 'src/users/user'
import { unreachable } from 'src/utils'
import { Repository } from 'typeorm'
import { NewJudgementInput } from './dto/newJudgement.input'
import { Judgement, JudgementType } from './judgement'

@Injectable()
export class JudgementsService {
  constructor(
    @InjectRepository(Judgement)
    private judgementsRepository: Repository<Judgement>,
    private commentService: CommentsService,
    private requestsService: RequestsService,
  ) {}

  findAll(): Promise<Judgement[]> {
    return this.judgementsRepository.find()
  }

  findOneById(id: number): Promise<Judgement> {
    return this.judgementsRepository.findOne(id)
  }

  async user(judgementId: number): Promise<User> {
    const judgement = await this.judgementsRepository.findOne(judgementId, {
      relations: ['user'],
    })

    return judgement.user
  }

  async request(judgementId: number): Promise<Request> {
    const judgement = await this.judgementsRepository.findOne(judgementId, {
      relations: ['request'],
    })

    return judgement.request
  }

  async create(input: NewJudgementInput): Promise<Judgement> {
    // TODO: 企業の判定
    // TODO: 承認権限があるかどうかの判定
    // TODO: 最終承認への対応
    // 承認リクエストされているかの判定はやらない
    let request = await this.requestsService.findOneById(input.requestId)
    if (request.status !== RequestStatus.requesting) {
      throw new HttpException(
        `status of request is not requesting but ${request.status}`,
        HttpStatus.BAD_REQUEST,
      )
    }
    const data = {
      ...input,
    }
    delete data.comment
    const judgement = await this.judgementsRepository.save(data)

    await this.commentService.create({
      content: input.comment,
      requestId: input.requestId,
      userId: input.userId,
      invoiceId: request.invoiceId,
      judgementId: judgement.id,
    })
    request = await this.requestsService.findOneById(input.requestId)

    // 競合時の処理
    if (request.status !== RequestStatus.requesting) {
      const comments = await this.commentService.where({
        judgementId: judgement.id,
      })
      for (const comment of comments) {
        await this.commentService.remove(comment.id)
      }
      await this.judgementsRepository.delete(data)
      throw new HttpException(
        `CONFLICT: status of request is not requesting but ${request.status}`,
        HttpStatus.CONFLICT,
      )
    }

    await this.requestsService.updateStatus(
      input.requestId,
      this.typeToRequestStatus(input.type),
    )

    return judgement
  }

  // async remove(id: number): Promise<boolean> {
  //   const result = await this.judgementsRepository.delete(id)
  //   return result.affected > 0
  // }

  private typeToRequestStatus(type: JudgementType): RequestStatus {
    if (type === JudgementType.approve) {
      return RequestStatus.approved
    } else if (type === JudgementType.decline) {
      return RequestStatus.declined
    }
    unreachable(type)
  }
}
