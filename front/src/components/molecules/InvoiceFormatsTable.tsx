import { Table, Thead, Tr, Th, Tbody, Td, Button, Box } from '@chakra-ui/react'
import { MdCreate } from 'react-icons/md'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export type InvoiceFormatsTableProps = {
  formats: {
    companyName: string
    formatsName: string
    invoiceFormatsLogId: string
  }[]
}

const InvoiceFormatsTable: React.VFC<InvoiceFormatsTableProps> = ({
  formats,
}: InvoiceFormatsTableProps) => {
  const navigate = useNavigate()
  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>企業名</Th>
          <Th>請求書名</Th>
          <Th>作成</Th>
        </Tr>
      </Thead>
      <Tbody>
        {formats.map((format) => (
          <Tr key={format.invoiceFormatsLogId}>
            <Td>{format.companyName}</Td>
            <Td>{format.formatsName}</Td>
            <Td>
              <Button bgColor="cyan.500" color="white" onClick={() => navigate('/issue')}>
                <MdCreate title="作成" />
                <Box p="2">作成</Box>
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default InvoiceFormatsTable
