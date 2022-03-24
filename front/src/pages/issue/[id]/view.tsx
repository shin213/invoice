import { Box, Table, Thead, Tr, Th, Tbody, Td, Button, Wrap, WrapItem } from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdSend } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { ValueType } from '../../../components/molecules/NewInvoiceEditor'
import LoginTemplate from '../../../components/templates/LoginTemplate'
import InvoicePDF from '../../../components/molecules/InvoicePDF'
import { toInvoiceDataProps, generateInvoicePDF } from '../../../lib/generateInvoicePDF'
import { useIssueIdViewQuery } from '../../../generated/graphql'

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [args] = useState<{ body: NewInvoiceViewPageElement[] }>(
    location.state as { body: NewInvoiceViewPageElement[] },
  )

  const { loading, error, data } = useIssueIdViewQuery({ variables: { id: '' } })
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

  // TODO: 作り込み
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
                  {element.valueType === ValueType.number
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
            <Button bgColor="cyan.500" color="white" onClick={() => navigate('../issue')}>
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
