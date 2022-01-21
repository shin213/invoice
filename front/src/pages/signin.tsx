import React, { useCallback, useState } from 'react'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'

import { userPool } from '../lib/cognito'
import { useNavigate } from 'react-router-dom'

export const SignInPage: React.VFC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const onChangeEmail = useCallback((e) => {
    setEmail(e.currentTarget.value)
  }, [])

  const [password, setPassword] = useState('')
  const onChangePassword = useCallback((e) => {
    setPassword(e.currentTarget.value)
  }, [])

  const onSignInSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const authenticationDetails = new AuthenticationDetails({
        Username: email,
        Password: password,
      })

      const cognitoUser = new CognitoUser({
        Username: email,
        Pool: userPool,
      })

      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          // const accessToken = result.getAccessToken().getJwtToken()
          navigate('/')
        },

        onFailure: (err) => {
          alert(err.message)
          console.error(err)
        },
      })
    },
    [email, password],
  )

  return (
    <>
      <h1>Sign In</h1>
      <form>
        <fieldset>
          <legend>User Info</legend>
          <div>
            Email: <input type="email" value={email} onChange={onChangeEmail} />
          </div>
          <div>
            Password:
            <input type="password" value={password} onChange={onChangePassword} />
          </div>
        </fieldset>
        <button onClick={onSignInSubmit}>Sign In</button>
      </form>
    </>
  )
}
