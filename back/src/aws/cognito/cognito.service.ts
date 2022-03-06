import { Injectable } from '@nestjs/common'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { AuthUser } from './cognito'

@Injectable()
export class CognitoService {
  private client: CognitoIdentityServiceProvider
  protected user?: AuthUser
  constructor() {
    this.client = new CognitoIdentityServiceProvider({
      region: 'ap-northeast-1',
    })
  }
  public async getUserByToken(token: string): Promise<AuthUser> {
    const user = await this.client
      .getUser({
        AccessToken: token,
      })
      .promise()
    const inAdminGroup = Buffer.from(token, 'base64')
      .toString('utf8')
      .includes('"cognito:groups":["Admin"]')
    return { user, inAdminGroup }
  }
  public loadCurrentUser(): AuthUser | undefined {
    return this.user
  }
}
