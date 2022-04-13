import React, { useCallback, useEffect, useState } from 'react'
import { CognitoUserAttribute, ISignUpResult, CognitoUser } from 'amazon-cognito-identity-js'

import { userPool, useUser } from '../lib/cognito'
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
import { Navigate, useNavigate } from 'react-router-dom'
import { useKana } from 'react-use-kana'
import {
  SignUpCheckEmailQuery,
  useSignUpCheckEmailLazyQuery,
  useSignUpMutation,
} from '../generated/graphql'
import { mutationOptionsWithMsg } from '../utils'
import { COGNITO_ERROR } from '../utils/i18n'

const errorMessageTranslation: Record<string, string> = {
  ...COGNITO_ERROR,
  'Incorrect username or password.': 'メールアドレスまたはパスワードが正しくありません。',
  'Missing required parameter USERNAME': 'メールアドレスを入力してください。',
  'Password attempts exceeded': 'パスワードの試行回数が多すぎます。',
  'An account with the given email already exists.': 'このメールアドレスは既に登録されています。',
  'UnconfirmedUser Not Found':
    'このメールアドレスは事前登録されていません。運営までお問い合わせください。',
  'User Already Exists': 'このメールアドレスは既に登録されています。',
  'User Not Found In Cognito':
    'このメールアドレスは正常に登録されていません。運営までお問い合わせください。',
  '': '不明なエラーです。',
}

type CheckEmailProps = {
  onCheckEmail: (email: string) => void
}

const CheckEmail: React.VFC<CheckEmailProps> = ({ onCheckEmail }: CheckEmailProps) => {
  const [email, setEmail] = useState('')
  const onChangeEmail: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setEmail(e.currentTarget.value)
  }, [])

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onCheckEmail(email)
    }
  }
  const navigate = useNavigate()

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="lg" p={4} borderRadius="md" shadow="md">
        <Heading as="h3" size="md" textAlign="center">
          メールアドレスをご入力ください
          <br />
          (事前にご登録いただく必要があります)
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Input
            placeholder="メールアドレス"
            type="email"
            value={email}
            onChange={onChangeEmail}
            onKeyDown={onKeyDown}
          />
          <PrimaryButton onClick={() => onCheckEmail(email)}>登録へ</PrimaryButton>
          <PrimaryButton onClick={() => navigate('/signin')}>ログインへ戻る</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
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
  readonly userData: SignUpCheckEmailQuery
  readonly onSignUpSubmit: (
    userData: SignUpCheckEmailQuery,
    password: string,
    user: UserFormData,
    familyKana: string,
    givenKana: string,
  ) => void
  // readonly createUnconfirmedUser: ReturnType<typeof useCreateUserMutation>[0]
}
const SignUp: React.VFC<SignUpProps> = ({ userData, onSignUpSubmit }: SignUpProps) => {
  const [password, setPassword] = useState('')
  const onChangePassword: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setPassword(e.currentTarget.value)
  }, [])

  const [user, setUser] = useState<UserFormData>({
    ...userData.unconfirmedUser,
  })

  const _onSignUpSubmit: React.MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      e.preventDefault()
      onSignUpSubmit(userData, password, user, familyKana, givenKana)
    },
    [userData, password, user],
  )

  const onChangeElement = useCallback(
    async <T extends keyof UserFormData>(elementId: T, value: UserFormData[T]) => {
      const _user: UserFormData = { ...user }
      _user[elementId] = value
      setUser(_user)
    },
    [user],
  )

  const [familyKana, setFamilyKana] = useState(user.familyNameFurigana)
  const [givenKana, setGivenKana] = useState(user.givenNameFurigana)
  const { kana: _familyKana, setKanaSource: setFamilyKanaSrc } = useKana()
  const { kana: _givenKana, setKanaSource: setGivenKanaSrc } = useKana()

  useEffect(() => {
    // runs only once
    setFamilyKanaSrc(user.familyNameFurigana)
    setGivenKanaSrc(user.givenNameFurigana)
  }, [])
  useEffect(() => {
    setFamilyKana(_familyKana)
    setGivenKana(_givenKana)
  }, [_familyKana, _givenKana])

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="lg" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Invoice
        </Heading>
        <Divider my={4} />
        <Stack spacing={6} py={4} px={10}>
          <Box>{userData.unconfirmedUser.email}</Box>
          <Input
            placeholder="パスワード(アルファベット小文字と数字を含むことが必須です)"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
          <Divider my={4} />
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>氏</Td>
                <Td>
                  <Input
                    defaultValue={user.familyName}
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
                    defaultValue={user.givenName}
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
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>従業員コード</Td>
                <Td>
                  <Input
                    defaultValue={user.employeeCode}
                    onChange={(e) => onChangeElement('employeeCode', e.target.value)}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <PrimaryButton onClick={_onSignUpSubmit}>確認コード送信</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
}

type ConfirmationProps = {
  readonly userData: SignUpCheckEmailQuery
  readonly cognitoUser: CognitoUser
  readonly onConfirmationSuccessful: () => void
}

const Confirmation: React.VFC<ConfirmationProps> = ({
  userData,
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
            description: errorMessageTranslation[err.message] || '不明なエラーです。',
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
      <Box bg="white" w="lg" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          Invoice
        </Heading>
        <Box>{userData.unconfirmedUser.email}</Box>
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

const _SignUpPage: React.VFC = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const [cognitoUser, setCognitoUser] = useState<CognitoUser | null>(userPool.getCurrentUser())

  const [checkEmail, { data: checkedUser, error: checkEmailError }] = useSignUpCheckEmailLazyQuery({
    fetchPolicy: 'no-cache',
  })

  const onCheckEmail = useCallback((email: string) => {
    checkEmail({ variables: { email } })
  }, [])

  const [signUp] = useSignUpMutation(
    mutationOptionsWithMsg(toast, 'ユーザー登録に成功しました', errorMessageTranslation),
  )

  const onSignUpSubmit = useCallback(
    (
      userData: SignUpCheckEmailQuery,
      password: string,
      user: UserFormData,
      familyKana: string,
      givenKana: string,
    ) => {
      const attributes = [
        new CognitoUserAttribute({
          Name: 'email',
          Value: userData.unconfirmedUser.email,
        }),
      ]

      userPool.signUp(
        userData.unconfirmedUser.email,
        password,
        attributes,
        [],
        (err, result?: ISignUpResult) => {
          if (err || !result) {
            toast({
              description: errorMessageTranslation[err?.message ?? ''] || '不明なエラーです。',
              status: 'error',
              position: 'top',
              isClosable: true,
            })
            return
          }
          console.log(result.user)
          result.user.getUserAttributes((err, attributes) => {
            console.log(err, attributes)
          })
          result.user.getUserData((err, data) => {
            console.log(err, data)
          })
          if (!user.familyName) {
            toast({
              description: '姓を入力してください',
              status: 'error',
              position: 'top',
              isClosable: true,
            })
            return
          }
          if (!user.givenName) {
            toast({
              description: '名を入力してください',
              status: 'error',
              position: 'top',
              isClosable: true,
            })
            return
          }
          if (!familyKana) {
            toast({
              description: '姓(ふりがな)を入力してください',
              status: 'error',
              position: 'top',
              isClosable: true,
            })
            return
          }
          if (!givenKana) {
            toast({
              description: '名(ふりがな)を入力してください',
              status: 'error',
              position: 'top',
              isClosable: true,
            })
            return
          }
          signUp({
            variables: {
              newUser: {
                employeeCode: user.employeeCode,
                familyName: user.familyName,
                givenName: user.givenName,
                isAdmin: user.isAdmin,
                email: userData.unconfirmedUser.email,
                companyId: userData.unconfirmedUser.company.id,
                familyNameFurigana: familyKana,
                givenNameFurigana: givenKana,
              },
            },
          })
          setCognitoUser(result.user)
        },
      )
    },
    [],
  )

  const onConfirmationSuccessful = useCallback(() => {
    navigate('/signin')
  }, [])

  // TODO: 連続で押した時、checkEmailError が切り替わらないと表示されない
  useEffect(() => {
    if (checkEmailError) {
      toast({
        description: errorMessageTranslation[checkEmailError.message] || '不明なエラーです。',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
    }
  }, [checkEmailError])

  return (
    <>
      {!checkedUser && <CheckEmail onCheckEmail={onCheckEmail} />}
      {checkedUser && !cognitoUser && (
        <SignUp userData={checkedUser} onSignUpSubmit={onSignUpSubmit} />
      )}
      {checkedUser && cognitoUser && (
        <Confirmation
          userData={checkedUser}
          cognitoUser={cognitoUser}
          onConfirmationSuccessful={onConfirmationSuccessful}
        />
      )}
    </>
  )
}

const SignUpPage: React.VFC = () => {
  const user = useUser()
  if (user != undefined) {
    return <Navigate to="/" />
  }
  return <_SignUpPage />
}

export default SignUpPage
