import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js'
import 'dotenv/config'

const poolData = {
  UserPoolId: process.env.AWS_USER_POOL_ID || '',
  ClientId: process.env.AWS_CLIENT_ID || '',
}

const userPool = new CognitoUserPool(poolData)

const email = process.env.LOCAL_USER_EMAIL || ''
const password = process.env.LOCAL_USER_PASSWORD || ''

const authenticationDetails = new AuthenticationDetails({
  Username: email,
  Password: password,
})

const cognitoUser = new CognitoUser({
  Username: email,
  Pool: userPool,
})

cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: (result) => {
    const accessToken = result.getAccessToken().getJwtToken()
    console.log(JSON.stringify({ authorization: accessToken }))
  },
  onFailure: (err) => console.error(err),
})
