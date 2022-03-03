import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { PrimaryButton } from '../../../components/atoms/Buttons'
import { TextArea } from '../../../components/atoms/TextArea'
import InvoiceSteps from '../../../components/molecules/InvoiceSteps'
import UsersTable from '../../../components/molecules/UsersTable'
import LoginTemplate from '../../../components/templates/LoginTemplate'

const users = [
  {
    id: 1,
    familyName: '織田',
    givenName: '信長',
    familyNameFurigana: 'おだ',
    givenNameFurigana: 'のぶなが',
    employeeCode: '1',
    email: 'oda.nobunaga@example.com',
    isAdmin: false,
  },
  {
    id: 2,
    familyName: '豊臣',
    givenName: '秀吉',
    familyNameFurigana: 'とよとみ',
    givenNameFurigana: 'ひでよし',
    employeeCode: '2',
    email: 'toyotomi.hideyoshi@example.com',
    isAdmin: false,
  },
]

const InquirySendPage: React.VFC = () => {
  const [comment, setComment] = useState('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

  return (
    <LoginTemplate>
      <Box bg="white" p={4}>
        <InvoiceSteps />
      </Box>
      <Stack bg="white" p={4}>
        {users && (
          <>
            <Heading as="h3" size="md">
              問い合わせ先
            </Heading>
            {/* TODO: UsersTableを選択可能に */}
            <UsersTable users={users} />
          </>
        )}
      </Stack>
      <Box bg="white" p={4}>
        <Stack>
          <TextArea placeholder="問い合わせ内容" value={comment} onChange={onChangeComment} />
          <HStack>
            <PrimaryButton>問い合わせを送信</PrimaryButton>
          </HStack>
        </Stack>
      </Box>
    </LoginTemplate>
  )
}

export default InquirySendPage
