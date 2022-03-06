// Sign up は開発者用。バックエンドに移行次第削除
import React, { useCallback, useState } from 'react'
import { CognitoUserAttribute, ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js'

import { userPool } from '../lib/cognito'
import { Flex, Box, Heading, Divider, Stack, Input, useToast } from '@chakra-ui/react'
import { PrimaryButton } from '../components/atoms/Buttons'
import { useNavigate } from 'react-router-dom'

export const SignUpPage: React.VFC = () => {
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

  const [userSignedUp, setUserSignedUp] = useState(false)

  const [confirmation, setConfirmation] = useState('')
  const onConfirmationChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setConfirmation(e.currentTarget.value)
  }, [])

  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(userPool.getCurrentUser())

  const onSignUpSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      const attributes = [
        new CognitoUserAttribute({
          Name: 'email',
          Value: email,
        }),
      ]

      userPool.signUp(email, password, attributes, [], (err, result?: ISignUpResult) => {
        if (err || !result) {
          console.error(err)
          return
        }
        setCognitoUser(result.user)
        setUserSignedUp(true)
      })
    },
    [email, password],
  )

  const onConfirmationSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()

      if (!cognitoUser) {
        return console.error('コンソールからユーザーを無効化・削除し、やり直してください')
      }

      cognitoUser.confirmRegistration(confirmation, true, (err, result) => {
        if (err) {
          toast({
            description: err.message,
            status: 'error',
            position: 'top',
            isClosable: true,
          })
          console.error(err)
          return
        }
        toast({
          description: result,
          status: 'error',
          position: 'top',
          isClosable: true,
        })
        navigate('/signin')
      })
    },
    [cognitoUser, confirmation],
  )

  // if (cognitoUser != null) {
  //   cognitoUser.getSession((err: any, session: any) => {
  //     if (err) {
  //       console.log(err);
  //       alert(err);
  //       return;
  //     }
  //     console.log("session validity: " + session.isValid());
  //   });
  // }

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
          <PrimaryButton onClick={onSignUpSubmit}>確認コード送信</PrimaryButton>
          {userSignedUp && <span>メールを見て確認コードをご確認ください</span>}
        </Stack>
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="確認コード"
            type="text"
            value={confirmation}
            onChange={onConfirmationChange}
          />
          <PrimaryButton onClick={onConfirmationSubmit}>ユーザー登録</PrimaryButton>
          <PrimaryButton onClick={() => navigate('/signin')}>ログイン画面へ</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
}
