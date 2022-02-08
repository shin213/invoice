import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { PrimaryButton } from '../../../components/atoms/Buttons'
import { TextArea } from '../../../components/atoms/TextArea'
import InvoiceSteps from '../../../components/molecules/InvoiceSteps'
import UsersTable from '../../../components/molecules/UsersTable'
import LoginTemplate from '../../../components/templates/LoginTemplate'
import { useCreateRequestMutation, useRequestSendQuery } from '../../../generated/graphql'

const RequestSendPage: React.VFC = () => {
  const [comment, setComment] = useState('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

  const { error, data } = useRequestSendQuery()
  if (error) {
    console.error(error)
  }

  const [createRequest] = useCreateRequestMutation({
    onCompleted(data) {
      alert(JSON.stringify(data))
    },
    onError(err) {
      alert(JSON.stringify(err))
    },
  })

  const onClickRequestSend = async () => {
    const result = await createRequest({
      variables: {
        newRequest: {
          comment,
          invoice_id: '0e5cdeb1-a4e3-4407-b33e-88cf5dbec2ea',
          request_receiver_ids: [2, 3],
          requester_id: 1,
        },
      },
    })
    console.log(result)
  }

  return (
    <LoginTemplate>
      <Box bg="white" p={4}>
        <InvoiceSteps />
      </Box>
      <Stack bg="white" p={4}>
        {data && (
          <>
            <Heading as="h3" size="md">
              申請先
            </Heading>
            {/* TODO: UsersTableを選択可能に */}
            <UsersTable users={data.users} />
          </>
        )}
      </Stack>
      <Box bg="white" p={4}>
        <Stack>
          <TextArea placeholder="コメント" value={comment} onChange={onChangeComment} />
          <HStack>
            <PrimaryButton onClick={() => onClickRequestSend()}>承認リクエストを送信</PrimaryButton>
          </HStack>
        </Stack>
      </Box>
    </LoginTemplate>
  )
}

export default RequestSendPage
