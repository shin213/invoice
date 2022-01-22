import { Box, HStack, Stack } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { PrimaryButton } from '../../components/atoms/Buttons'
import { TextArea } from '../../components/atoms/TextArea'
import InvoiceSteps from '../../components/molecules/InvoiceSteps'
import LoginTemplate from '../../components/templates/LoginTemplate'

const RequestSendPage: React.VFC = () => {
  const [comment, setComment] = useState('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

  return (
    <LoginTemplate>
      <Box bg="white" p={4}>
        <InvoiceSteps />
      </Box>
      <Box bg="white" p={4}>
        <Stack>
          <TextArea placeholder="コメント" value={comment} onChange={onChangeComment} />
          <HStack>
            <PrimaryButton>承認リクエストを送信</PrimaryButton>
          </HStack>
        </Stack>
      </Box>
    </LoginTemplate>
  )
}

export default RequestSendPage
