import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { MdSend } from 'react-icons/md'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ValueType } from '../../../components/molecules/NewInvoiceEditor'
import LoginTemplate from '../../../components/templates/LoginTemplate'
import InvoicePDF from '../../../components/molecules/InvoicePDF'
import { toInvoiceDataProps, generateInvoicePDF } from '../../../lib/generateInvoicePDF'
import { useIssueIdViewQuery, useIssueIdViewSendInvoiceMutation } from '../../../generated/graphql'
import { mutationOptions } from '../../../utils'

export type NewInvoiceViewPageElement = {
  order: number
  label: string
  value?: string | null
  valueType: ValueType
  own: boolean
}

const NewInvoiceViewPage: React.VFC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { invoiceId } = useParams()

  const toast = useToast()

  const [sendInvoice] = useIssueIdViewSendInvoiceMutation(
    mutationOptions(toast, () => {
      toast({
        title: '送信できました',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      navigate('../issue')
    }),
  )
  const [args] = useState<{ body: NewInvoiceViewPageElement[] }>(
    location.state as { body: NewInvoiceViewPageElement[] },
  )

  const { loading, error, data } = useIssueIdViewQuery({
    variables: { id: invoiceId ?? '' },
    fetchPolicy: 'no-cache',
  })
  if (loading || error || !data) {
    if (error) {
      console.error(error)
    }
    return (
      <LoginTemplate>
        <></>
      </LoginTemplate>
    )
  }

  const invoiceData = toInvoiceDataProps(data)
  const doc = generateInvoicePDF(invoiceData)

  const handleSendInvoice = useCallback(() => {
    if (invoiceId == undefined) {
      toast({
        description: '請求書が存在せず送信できませんでした。',
        status: 'error',
        position: 'top',
        isClosable: true,
      })
      return
    }
    // TODO: comment を指定できるように
    sendInvoice({ variables: { input: { invoiceId, comment: '' } } })
  }, [sendInvoice, invoiceId, toast])

  return (
    <LoginTemplate>
      <InvoicePDF doc={doc} />
      <Box bg="white" p={4}>
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>項目</Th>
              <Th>値</Th>
            </Tr>
          </Thead>
          <Tbody>
            {args.body.map((element) => (
              <Tr key={element.order}>
                <Td>{element.label}</Td>
                <Td>
                  {element.valueType === 'number'
                    ? Number(element.value).toLocaleString()
                    : element.value}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Box bg="white" p={2} />
        <Wrap spacing="30px" align="center" justify="right">
          <WrapItem>
            <Button bgColor="cyan.500" color="white" onClick={() => handleSendInvoice()}>
              <MdSend title="送信" />
              <Box p="2">送信</Box>
            </Button>
          </WrapItem>
        </Wrap>
      </Box>
    </LoginTemplate>
  )
}

export default NewInvoiceViewPage
