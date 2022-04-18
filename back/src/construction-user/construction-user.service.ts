import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConstructionUser } from './construction-user'

@Injectable()
export class ConstructionUserService {
  constructor(
    @InjectRepository(ConstructionUser)
    private repository: Repository<ConstructionUser>,
  ) {}

  async create(constructionId: number, userId: string) {
    const constructionUser = this.repository.create({
      constructionId,
      userId,
    })
    await this.repository.save(constructionUser)
    return constructionUser
  }
}
