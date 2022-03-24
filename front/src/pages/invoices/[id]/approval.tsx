import { Box, HStack, Stack } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { ErrorButton, PrimaryButton } from '../../../components/atoms/Buttons'
import { TextArea } from '../../../components/atoms/TextArea'
import DummyInvoiceSteps from '../../../components/molecules/DummyInvoiceSteps'
import LoginTemplate from '../../../components/templates/LoginTemplate'

const ApprovalSendPage: React.VFC = () => {
  const [comment, setComment] = useState('')
  const onChangeComment: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setComment(e.currentTarget.value)
  }, [])

  return (
    <LoginTemplate>
      <Box bg="white" p={4}>
        <DummyInvoiceSteps />
      </Box>
      <Box bg="white" p={4}>
        <Stack>
          <TextArea placeholder="コメント" value={comment} onChange={onChangeComment} />
          <HStack>
            <PrimaryButton>承認</PrimaryButton>
            <ErrorButton>不承認</ErrorButton>
          </HStack>
        </Stack>
      </Box>
    </LoginTemplate>
  )
}

export default ApprovalSendPage
