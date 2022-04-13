import React, { useCallback, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Flex, Box, Heading, Divider, Stack, Input, useToast } from '@chakra-ui/react'
import { PrimaryButton } from '../components/atoms/Buttons'
import { COGNITO_ERROR } from '../utils/i18n'
import { Auth } from 'aws-amplify'
import { checkProperty } from '../utils'
import { useUser } from '../lib/cognito'

const errorMessageTranslation: Record<string, string> = {
  ...COGNITO_ERROR,
}

const _SignInPage: React.VFC = () => {
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
    async (e) => {
      e.preventDefault()

      // TODO: ローディングを表示
      try {
        await Auth.signIn(email, password)
        navigate('/')
      } catch (err) {
        console.error(err)
        const _msg = checkProperty(err, 'message')
        const msg = typeof _msg === 'string' ? _msg : ''
        toast({
          description: errorMessageTranslation[msg] || '不明なエラーです。',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
      }
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

const SignInPage: React.VFC = () => {
  const user = useUser()
  if (user != null) {
    return <Navigate to="/" />
  }
  return <_SignInPage />
}

export default SignInPage
