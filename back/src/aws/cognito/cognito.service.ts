import { Injectable } from '@nestjs/common'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { UsersService } from 'src/users/users.service'
import { AuthUser } from './cognito'

@Injectable()
export class CognitoService {
  private client: CognitoIdentityServiceProvider
  protected user?: AuthUser
  constructor(private usersService: UsersService) {
    this.client = new CognitoIdentityServiceProvider({
      region: 'ap-northeast-1',
    })
  }
  public async getUserByToken(token: string): Promise<AuthUser | undefined> {
    const cognitoUser = await this.client
      .getUser({
        AccessToken: token,
      })
      .promise()

    const dbUser = await this.usersService.findOneById(cognitoUser.Username)
    if (dbUser == undefined) {
      return undefined
    }

    const inAdminGroup = Buffer.from(token, 'base64')
      .toString('utf8')
      .includes('"cognito:groups":["Admin"]')

    return { cognitoUser, dbUser, inAdminGroup }
  }
  public loadCurrentUser(): AuthUser | undefined {
    return this.user
  }
}
