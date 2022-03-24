import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
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

  findOneById(id: number): Promise<Construction | undefined> {
    return this.constructionsRepository.findOne(id)
  }

  async create(data: NewConstructionInput): Promise<Construction> {
    const construction = this.constructionsRepository.create(data)
    await this.constructionsRepository.save(construction)
    return construction
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.constructionsRepository.delete(id)
    const affected = result.affected
    return affected != null && affected > 0
  }
}
