import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user'
import { NewUserInput } from './dto/newUser.input'
import { Company } from 'src/companies/company'
import { UnconfirmedUsersService } from 'src/unconfirmed-users/unconfirmed-users.service'
import { UnconfirmedUser } from 'src/unconfirmed-users/unconfirmed-user'
import { CognitoService } from 'src/aws/cognito/cognito.service'

@Injectable()
export class UsersService {
  // private userPool: CognitoUserPool
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private unconfirmedUsersService: UnconfirmedUsersService,
    @Inject(forwardRef(() => CognitoService))
    private cognitoService: CognitoService,
  ) {
    // const configService = new ConfigService()
    // const poolData = {
    //   UserPoolId: configService.get('AWS_USER_POOL_ID', ''),
    //   ClientId: configService.get('AWS_CLIENT_ID', ''),
    // }
    // this.userPool = new CognitoUserPool(poolData)
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find()
  }

  findOneById(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne(id)
  }

  findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
      where: { email },
    })
  }

  async checkUserUnconfirmed(email: string): Promise<UnconfirmedUser> {
    const unconfirmedUser = await this.unconfirmedUsersService.findOneByEmail(
      email,
    )
    if (unconfirmedUser == undefined) {
      throw new HttpException('UnconfirmedUser Not Found', HttpStatus.NOT_FOUND)
    }
    const user = await this.findOneByEmail(email)
    if (user != undefined) {
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST)
    }
    return unconfirmedUser
  }

  async company(userId: string): Promise<Company> {
    const user = await this.usersRepository.findOne(userId, {
      relations: ['company'],
    })
    if (user == undefined) {
      throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
    }

    return user.company
  }

  async create(data: NewUserInput): Promise<User> {
    const unconfirmedUser = this.unconfirmedUsersService.findOneByEmail(
      data.email,
    )
    if (unconfirmedUser == undefined) {
      throw new HttpException('UnconfirmedUser Not Found', HttpStatus.NOT_FOUND)
    }
    const userFound = await this.findOneByEmail(data.email)
    if (userFound != undefined) {
      throw new HttpException('User Already Exists', HttpStatus.BAD_REQUEST)
    }

    const confirmed = await this.cognitoService.getCognitoUserByEmail(
      data.email,
    )
    if (!confirmed) {
      throw new HttpException('User Not Found In Cognito', HttpStatus.NOT_FOUND)
    }
    if (
      confirmed.Attributes?.find((v) => v.Name === 'email')?.Value !==
      data.email
    ) {
      throw new HttpException('User Email Not Match', HttpStatus.BAD_REQUEST)
    }
    const user = this.usersRepository.create({
      ...data,
    })
    await this.usersRepository.save(user)
    return user
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.usersRepository.delete(id)
    const affected = result.affected
    return affected != null && affected > 0
  }
}
