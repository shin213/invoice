import { GetUserResponse } from 'aws-sdk/clients/cognitoidentityserviceprovider'

export class AuthUser {
  constructor(
    public readonly user: GetUserResponse,
    public readonly inAdminGroup: boolean,
  ) {}
}
