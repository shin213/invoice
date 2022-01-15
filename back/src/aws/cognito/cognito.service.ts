import { Injectable } from '@nestjs/common'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider'

@Injectable()
export class CognitoService {
  private client: CognitoIdentityServiceProvider
  protected user: GetUserResponse
  constructor() {
    this.client = new CognitoIdentityServiceProvider({
      region: 'ap-northeast-1',
    })
  }
  public async getUserByToken(token: string): Promise<GetUserResponse> {
    this.user = await this.client
      .getUser({
        AccessToken: token,
      })
      .promise()
    return this.user
  }
  public loadCurrentUser(): GetUserResponse {
    return this.user
  }
}
