// Sign up は開発者用。バックエンドに移行次第削除
import React, { useCallback, useEffect, useState } from 'react'
import { CognitoUserAttribute, ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js'

import { userPool } from '../lib/cognito'
import {
  Flex,
  Box,
  Heading,
  Divider,
  Stack,
  Input,
  useToast,
  Table,
  Tbody,
  Td,
  Tr,
} from '@chakra-ui/react'
import { PrimaryButton } from '../components/atoms/Buttons'
import { useNavigate } from 'react-router-dom'
import { useKana } from 'react-use-kana'

const errorMessageTranslation: Record<string, string> = {
  'Incorrect username or password.': 'メールアドレスまたはパスワードが正しくありません。',
  'Missing required parameter USERNAME': 'メールアドレスを入力してください。',
  'Password attempts exceeded': 'パスワードの試行回数が多すぎます。',
  'An account with the given email already exists.': 'このメールアドレスは既に登録されています。',
  '': '不明なエラーです。',
}

type CheckEmailProps = {
  onCheckEmail: React.MouseEventHandler<HTMLButtonElement>
}

const CheckEmail: React.VFC<CheckEmailProps> = ({ onCheckEmail }: CheckEmailProps) => {
  const [email, setEmail] = useState('')
  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setEmail(e.currentTarget.value)
  }, [])

  return (
    <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
      <Heading as="h1" size="lg" textAlign="center">
        Invoice に登録するメールアドレスをご入力ください(事前に運営に共有いただく必要があります)
      </Heading>
      <Divider my={4} />
      <Stack spacing={6} py={4} px={10}>
        <Input placeholder="メールアドレス" type="email" value={email} onChange={onChangeEmail} />
        <PrimaryButton onClick={onCheckEmail}>登録画面へ</PrimaryButton>
      </Stack>
    </Box>
  )
}

type UserFormData = {
  email: string
  familyName: string
  givenName: string
  familyNameFurigana: string
  givenNameFurigana: string
  isAdmin: boolean
  employeeCode: string
}

type SignUpProps = {
  readonly email: string
  readonly onSignUpSuccessful: (user: CognitoUser) => void
  // readonly createUnconfirmedUser: ReturnType<typeof useCreateUserMutation>[0]
}
const SignUp: React.VFC<SignUpProps> = ({ email, onSignUpSuccessful }: SignUpProps) => {
  const toast = useToast()
  const [password, setPassword] = useState('')
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setPassword(e.currentTarget.value)
  }, [])

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
            description: errorMessageTranslation[err?.message ?? ''] ?? err?.message,
            status: 'error',
            position: 'top',
            isClosable: true,
          })
          return
        }
        onSignUpSuccessful(result.user)
      })
    },
    [email, password],
  )

  const [user, setUser] = useState<UserFormData>({
    email: '',
    familyName: '',
    givenName: '',
    familyNameFurigana: '',
    givenNameFurigana: '',
    employeeCode: '',
    isAdmin: true,
  })
  const onChangeElement = useCallback(
    async <T extends keyof UserFormData>(elementId: T, value: UserFormData[T]) => {
      const _user: UserFormData = { ...user }
      _user[elementId] = value
      setUser(_user)
    },
    [user],
  )

  const [familyKana, setFamilyKana] = useState('')
  const [givenKana, setGivenKana] = useState('')
  const { kana: _familyKana, setKanaSource: setFamilyKanaSrc } = useKana()
  const { kana: _givenKana, setKanaSource: setGivenKanaSrc } = useKana()
  useEffect(() => {
    setFamilyKana(_familyKana)
    setGivenKana(_givenKana)
  }, [_familyKana, _givenKana])
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Invoice
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Box>{email}</Box>
          <Input
            placeholder="パスワード(小文字と大文字と数字を含むこと)"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
          <Divider my={4} />
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>メールアドレス(必須)</Td>
                <Td>
                  <Input onChange={(e) => onChangeElement('email', e.target.value)} />
                </Td>
              </Tr>
              <Tr>
                <Td>氏</Td>
                <Td>
                  <Input
                    onChange={(e) => {
                      onChangeElement('familyName', e.target.value)
                      setFamilyKanaSrc(e.target.value)
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>名</Td>
                <Td>
                  <Input
                    onChange={(e) => {
                      onChangeElement('givenName', e.target.value)
                      setGivenKanaSrc(e.target.value)
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>氏(ふりがな)</Td>
                <Td>
                  <Input
                    value={familyKana}
                    onChange={(e) => {
                      setFamilyKana(e.target.value)
                      onChangeElement('familyNameFurigana', e.target.value)
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>名(ふりがな)</Td>
                <Td>
                  <Input
                    value={givenKana}
                    onChange={(e) => {
                      setGivenKana(e.target.value)
                      onChangeElement('givenNameFurigana', e.target.value)
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>従業員コード</Td>
                <Td>
                  <Input onChange={(e) => onChangeElement('employeeCode', e.target.value)} />
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <PrimaryButton onClick={onSignUpSubmit}>確認コード送信</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
}

type ConfirmationProps = {
  readonly email: string
  readonly cognitoUser: CognitoUser
  readonly onConfirmationSuccessful: () => void
}

const Confirmation: React.VFC<ConfirmationProps> = ({
  email,
  cognitoUser,
  onConfirmationSuccessful,
}: ConfirmationProps) => {
  const [confirmation, setConfirmation] = useState('')
  const toast = useToast()
  const onConfirmationChange = useCallback((e) => {
    setConfirmation(e.currentTarget.value)
  }, [])
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
          status: 'success',
          position: 'top',
          isClosable: true,
        })
        onConfirmationSuccessful()
      })
    },
    [cognitoUser, confirmation, onConfirmationSuccessful],
  )
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Invoice
        </Heading>
        <Box>{email}</Box>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="確認コード"
            type="text"
            value={confirmation}
            onChange={onConfirmationChange}
          />
          <PrimaryButton onClick={onConfirmationSubmit}>ユーザー登録</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
}

const SignUpPage: React.VFC = () => {
  const navigate = useNavigate()

  const [checkedEmail, setCheckedEmail] = useState('')

  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(userPool.getCurrentUser())

  const onCheckEmail: React.MouseEventHandler<HTMLButtonElement> = useCallback((e) => {
    // TODO
    setCheckedEmail(e.currentTarget.value)
  }, [])

  const onSignUpSuccessful = useCallback((user: CognitoUser) => {
    setCognitoUser(user)
  }, [])

  const onConfirmationSuccessful = useCallback(() => {
    navigate('/signin')
  }, [])

  return (
    <>
      {!checkedEmail && <CheckEmail onCheckEmail={onCheckEmail} />}
      {checkedEmail && !cognitoUser && (
        <SignUp email={checkedEmail} onSignUpSuccessful={onSignUpSuccessful} />
      )}
      {checkedEmail && cognitoUser && (
        <Confirmation
          email={checkedEmail}
          cognitoUser={cognitoUser}
          onConfirmationSuccessful={onConfirmationSuccessful}
        />
      )}
    </>
  )
}

export default SignUpPage
