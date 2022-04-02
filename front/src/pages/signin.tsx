import React, { useCallback, useState } from 'react'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'

import { userPool } from '../lib/cognito'
import { useNavigate } from 'react-router-dom'
import { Flex, Box, Heading, Divider, Stack, Input, useToast } from '@chakra-ui/react'
import { PrimaryButton } from '../components/atoms/Buttons'
import { COGNITO_ERROR } from '../utils/i18n'

const errorMessageTranslation: Record<string, string> = {
  ...COGNITO_ERROR,
}

export const SignInPage: React.VFC = () => {
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setEmail(e.currentTarget.value)
  }, [])

  const [password, setPassword] = useState('')
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setPassword(e.currentTarget.value)
  }, [])

  const onSignInSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
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

      // TODO: ローディングを表示
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: () => {
          // const accessToken = result.getAccessToken().getJwtToken()
          navigate('/')
        },

        onFailure: (err: { message: string }) => {
          toast({
            description: errorMessageTranslation[err.message] || '不明なエラーです。',
            status: 'error',
            position: 'top',
            isClosable: true,
          })
          console.error(err)
        },
      })
    },
    [email, password],
  )

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Invoice
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input placeholder="メールアドレス" type="email" value={email} onChange={onChangeEmail} />
          <Input
            placeholder="パスワード"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
          <PrimaryButton onClick={onSignInSubmit}>ログイン</PrimaryButton>
          <PrimaryButton onClick={() => navigate('/signup')}>ユーザー登録</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
}
