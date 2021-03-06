import { Table, Thead, Tr, Th, Tbody, Td, Button, Box } from '@chakra-ui/react'
import { MdCreate } from 'react-icons/md'
import React from 'react'

export type InvoiceFormatsTableProps = {
  formats: {
    companyName: string
    formatsName: string
    invoiceFormatsLogId: string
  }[]
  setFormatLogId: React.Dispatch<React.SetStateAction<string>>
}

const InvoiceFormatsTable: React.VFC<InvoiceFormatsTableProps> = ({
  formats,
  setFormatLogId,
}: InvoiceFormatsTableProps) => (
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
            <Button
              bgColor="primary.500"
              color="white"
              onClick={() => setFormatLogId(format.invoiceFormatsLogId)}
            >
              <MdCreate title="作成" />
              <Box p="2">作成</Box>
            </Button>
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)

export default InvoiceFormatsTable
