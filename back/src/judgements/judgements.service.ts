import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
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
    const data = {
      ...input,
      comments: [
        {
          content: input.comment,
        },
      ],
    }
    delete data.comment
    const judgement = this.judgementsRepository.create(data)

    await this.judgementsRepository.save(judgement)
    return judgement
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.judgementsRepository.delete(id)
    return result.affected > 0
  }
}
