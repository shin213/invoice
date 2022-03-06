import { Injectable } from '@nestjs/common'
import { CognitoIdentityServiceProvider } from 'aws-sdk'
import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider'

@Injectable()
export class CognitoService {
  private client: CognitoIdentityServiceProvider
  protected user!: GetUserResponse // Quick fix (avoid strict-null-checks)
  constructor() {
    this.client = new CognitoIdentityServiceProvider({
      region: 'ap-northeast-1',
    })
  }
  public async getUserByToken(token: string): Promise<GetUserResponse> {
    this.user = await this.client
      .getUser({
        // Quick fix (avoid strict-camel-case)
        // eslint-disable-next-line @typescript-eslint/naming-convention
        AccessToken: token,
      })
      .promise()
    return this.user
  }
  public loadCurrentUser(): GetUserResponse {
    return this.user
  }
}
