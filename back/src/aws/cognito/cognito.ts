import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider'
import { User } from 'src/users/user'

export class AuthUser {
  constructor(
    public readonly cognitoUser: GetUserResponse,
    public readonly dbUser: User,
    public readonly inAdminGroup: boolean,
  ) {}
}
