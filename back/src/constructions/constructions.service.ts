import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/users/user'
import { Repository } from 'typeorm'
import { Construction } from './construction'
import { NewConstructionInput } from './dto/newConstruction.input'

@Injectable()
export class ConstructionsService {
  constructor(
    @InjectRepository(Construction)
    private constructionsRepository: Repository<Construction>,
  ) {}

  findAll(): Promise<Construction[]> {
    return this.constructionsRepository.find()
  }

  findByCompany(companyId: number): Promise<Construction[]> {
    return this.constructionsRepository.find({
      where: { companyId },
    })
  }

  findOneById(id: number): Promise<Construction | undefined> {
    return this.constructionsRepository.findOne(id)
  }

  async create(
    data: NewConstructionInput,
    companyId: number,
  ): Promise<Construction> {
    const construction = this.constructionsRepository.create({
      ...data,
      companyId,
    })
    await this.constructionsRepository.save(construction)
    for (const userId of data.userIds) {
      await this.constructionsRepository
        .createQueryBuilder()
        .relation(Construction, 'constructionUsers')
        .of(construction)
        .add(userId)
    }
    return construction
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.constructionsRepository.delete(id)
    const affected = result.affected
    return affected != null && affected > 0
  }

  async users(id: number): Promise<User[]> {
    const construction = await this.constructionsRepository.findOne(id, {
      relations: ['constructionUsers', 'constructionUsers.user'],
    })
    if (construction == undefined) {
      throw new HttpException('Construction not found', HttpStatus.NOT_FOUND)
    }
    return (await construction.constructionUsers).map(
      (constructionUser) => constructionUser.user,
    )
  }
}
