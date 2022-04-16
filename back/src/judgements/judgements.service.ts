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

  findOneById(id: number): Promise<Judgement | undefined> {
    return this.judgementsRepository.findOne(id)
  }

  async user(judgementId: number): Promise<User> {
    const judgement = await this.judgementsRepository.findOne(judgementId, {
      relations: ['user'],
    })
    if (judgement == undefined) {
      throw new HttpException('Judgement Not Found', HttpStatus.NOT_FOUND)
    }

    return judgement.user
  }

  async request(judgementId: number): Promise<Request> {
    const judgement = await this.judgementsRepository.findOne(judgementId, {
      relations: ['request'],
    })
    if (judgement == undefined) {
      throw new HttpException('Judgement Not Found', HttpStatus.NOT_FOUND)
    }

    return judgement.request
  }

  async create(input: NewJudgementInput): Promise<Judgement> {
    const data = {
      userId: input.userId,
      requestId: input.requestId,
      type: input.type,
    }
    const judgement = await this.judgementsRepository.save(data)
    return judgement
  }

  // async remove(id: number): Promise<boolean> {
  //   const result = await this.judgementsRepository.delete(id)
  //   const affected = result.affected
  // return affected != null && affected > 0
  // }
}
