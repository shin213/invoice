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
    family_name: '織田',
    given_name: '信長',
    family_name_furigana: 'おだ',
    given_name_furigana: 'のぶなが',
    employee_code: '1',
    email: 'oda.nobunaga@example.com',
    is_admin: false,
  },
  {
    id: 2,
    family_name: '豊臣',
    given_name: '秀吉',
    family_name_furigana: 'とよとみ',
    given_name_furigana: 'ひでよし',
    employee_code: '2',
    email: 'toyotomi.hideyoshi@example.com',
    is_admin: false,
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
