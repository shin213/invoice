import { Box, Heading, Stack, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import InvoiceFormatsTable, {
  InvoiceFormatsTableProps,
} from '../components/molecules/InvoiceFormatsTable'
import LoginTemplate from '../components/templates/LoginTemplate'
import {
  FormatsQuery,
  useFormatsQuery,
  useFormatsCreateInvoiceMutation,
} from '../generated/graphql'

type TableData = Omit<InvoiceFormatsTableProps, 'setFormatLogId'>

function toInvoiceFormatsTableProps(data: FormatsQuery): TableData {
  const formats = data.invoiceFormatLogs.map((formatLog) => ({
    companyName: formatLog.invoiceFormat.company.name,
    formatsName: formatLog.invoiceFormat.name,
    invoiceFormatsLogId: formatLog.id,
  }))
  return { formats }
}

// TODO: dummyな値を修正する
const dummyLoginUserId = 1
const dummyCompanyId = 2

const InvoiceFormatsPage: React.VFC = () => {
  const toast = useToast()
  const navigate = useNavigate()
  const [formatLogId, setFormatLogId] = useState('')

  const [createInvoiceLog] = useFormatsCreateInvoiceMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onCompleted(data: any) {
      navigate(`/issue/${data.addInvoice.id}`)
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

  const onClickSave = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const result = await createInvoiceLog({
      variables: {
        input: {
          createdById: dummyLoginUserId,
          companyId: dummyCompanyId,
          status: 'notRequested',
          invoiceFormatLogId: formatLogId,
          body: [],
          detail: [],
        },
      },
    })
  }

  useEffect(() => {
    if (formatLogId) {
      onClickSave()
    }
  }, [formatLogId])

  const { loading, error, data } = useFormatsQuery()
  if (loading || error || !data) {
    if (error) {
      console.error(error)
    }
    return (
      <LoginTemplate>
        <Heading as="h1" size="md" textAlign="center">
          申請
        </Heading>
      </LoginTemplate>
    )
  }
  return (
    <LoginTemplate>
      <Stack>
        <Heading as="h1" size="md" textAlign="center">
          請求書ひな型
        </Heading>
        <Box bg="white" p={4} borderRadius="md" shadow="md">
          {data && (
            <InvoiceFormatsTable
              formats={toInvoiceFormatsTableProps(data).formats}
              setFormatLogId={setFormatLogId}
            />
          )}
        </Box>
      </Stack>
    </LoginTemplate>
  )
}

export default InvoiceFormatsPage
