import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from 'src/companies/company'
import { Repository } from 'typeorm'
import { NewUnconfirmedUserInput } from './dto/newUnconfirmedUser.input'
import { UnconfirmedUser } from './unconfirmed-user'

@Injectable()
export class UnconfirmedUsersService {
  constructor(
    @InjectRepository(UnconfirmedUser)
    private unconfirmedUsersRepository: Repository<UnconfirmedUser>,
  ) {}

  findAll(): Promise<UnconfirmedUser[]> {
    return this.unconfirmedUsersRepository.find()
  }

  findOneById(id: string): Promise<UnconfirmedUser | undefined> {
    return this.unconfirmedUsersRepository.findOne(id)
  }

  async company(userId: string): Promise<Company> {
    const user = await this.unconfirmedUsersRepository.findOne(userId, {
      relations: ['company'],
    })
    if (user == undefined) {
      throw new HttpException('UnconfirmedUser Not Found', HttpStatus.NOT_FOUND)
    }

    return user.company
  }

  async create(data: NewUnconfirmedUserInput): Promise<UnconfirmedUser> {
    const unconfirmedUser = this.unconfirmedUsersRepository.create(data)
    await this.unconfirmedUsersRepository.save(unconfirmedUser)
    return unconfirmedUser
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.unconfirmedUsersRepository.delete(id)
    const affected = result.affected
    return affected != null && affected > 0
  }
}
