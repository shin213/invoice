// Sign up は開発者用。バックエンドに移行次第削除
import React, { useCallback, useState } from 'react'
import { CognitoUserAttribute, ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js'

import { userPool } from '../lib/cognito'
import { Flex, Box, Heading, Divider, Stack, Input, useToast } from '@chakra-ui/react'
import { PrimaryButton } from '../components/atoms/Buttons'
import { useNavigate } from 'react-router-dom'
import { useCreateUserMutation } from '../generated/graphql'

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

  const [createUser] = useCreateUserMutation({
    onCompleted() {
      toast({
        description: 'ユーザーの作成に成功しました。ログインしてください',
        status: 'success',
        position: 'top',
        isClosable: true,
      })
    },
    onError(err) {
      const messages = err.graphQLErrors.map((e) => e.message)
      if (messages.length > 1) {
        console.error(messages)
      } else if (messages.length === 0) {
        console.error('messages.length === 0')
        messages.push('不明なエラーが発生しました。')
      }
      toast({
        description: messages[0],
        status: 'error',
        position: 'top',
        isClosable: true,
      })
    },
  })

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
          toast({
            description: err?.message,
            status: 'error',
            position: 'top',
            isClosable: true,
          })
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
        toast({
          description: 'コンソールからユーザーを無効化・削除し、やり直してください',
          status: 'error',
          position: 'top',
          isClosable: true,
        })
        return
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
            placeholder="パスワード(小文字と大文字と数字を含むこと)"
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
          {/* <PrimaryButton onClick={() => navigate('/signin')}>ログイン画面へ</PrimaryButton> */}
        </Stack>
      </Box>
    </Flex>
  )
}
