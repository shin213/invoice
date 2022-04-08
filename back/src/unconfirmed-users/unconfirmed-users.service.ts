import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Company } from 'src/companies/company'
import { User } from 'src/users/user'
import { Repository } from 'typeorm'
import { AdminNewUnconfirmedUserInput } from './dto/adminNewUnconfirmedUser.input'
import { UpdateUnconfirmedUserInput } from './dto/updateUnconfirmedUser.input'
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

  findOneByEmail(email: string): Promise<UnconfirmedUser | undefined> {
    return this.unconfirmedUsersRepository.findOne(email)
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

  async create(data: AdminNewUnconfirmedUserInput): Promise<UnconfirmedUser> {
    const unconfirmedUser = this.unconfirmedUsersRepository.create(data)
    await this.unconfirmedUsersRepository.save(unconfirmedUser)
    return unconfirmedUser
  }

  async updateWithoutCheckingCompany(data: UpdateUnconfirmedUserInput) {
    const unconfirmedUser = await this.findOneByEmail(data.email)
    if (unconfirmedUser == undefined) {
      throw new HttpException('UnconfirmedUser Not Found', HttpStatus.NOT_FOUND)
    }
    return await this._update(unconfirmedUser, data)
  }

  async update(currentUser: User, data: UpdateUnconfirmedUserInput) {
    const unconfirmedUser = await this.findOneByEmail(data.email)
    if (currentUser.isAdmin === false) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN)
    }
    if (
      unconfirmedUser == undefined ||
      unconfirmedUser.companyId !== currentUser.companyId
    ) {
      throw new HttpException('UnconfirmedUser Not Found', HttpStatus.NOT_FOUND)
    }
    return await this._update(unconfirmedUser, data)
  }

  private async _update(
    baseData: UnconfirmedUser,
    data: UpdateUnconfirmedUserInput,
  ): Promise<UnconfirmedUser> {
    const updatedUnconfirmedUser = this.unconfirmedUsersRepository.merge(
      baseData,
      data,
    )
    await this.unconfirmedUsersRepository.save(updatedUnconfirmedUser)
    return updatedUnconfirmedUser
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.unconfirmedUsersRepository.delete(id)
    const affected = result.affected
    return affected != null && affected > 0
  }
}
