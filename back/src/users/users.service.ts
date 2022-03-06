import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user'
import { NewUserInput } from './dto/newUser.input'
import { Company } from 'src/companies/company'
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UsersService {
  private userPool: CognitoUserPool
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    const configService = new ConfigService()
    const poolData = {
      UserPoolId: configService.get('AWS_USER_POOL_ID', ''),
      ClientId: configService.get('AWS_CLIENT_ID', ''),
    }
    this.userPool = new CognitoUserPool(poolData)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne(id)
  }

  async company(userId: number): Promise<Company> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['company'],
    })
    if (user == undefined) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
    }

    return user.company
  }

  async create(data: NewUserInput): Promise<User> {
    const tempCognitoUser = new CognitoUser({
      Username: data.email,
      Pool: this.userPool,
    })
    const confirmation = new Promise<CognitoUser>((resolve, reject) =>
      tempCognitoUser.confirmRegistration(
        data.confirmationCode,
        true,
        (err, result) => {
          if (err) {
            console.error(err)
            reject(err)
            return
          }
          resolve(result.user)
        },
      ),
    )
    await confirmation
    const user = this.usersRepository.create(data)
    await this.usersRepository.save(user)
    return user
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id)
    const affected = result.affected
    return affected != null && affected > 0
  }
}
