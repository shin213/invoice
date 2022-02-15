import { Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react'
import React from 'react'

const data = [
  { label: '取引先名', order: 1 },
  { label: '工事名', order: 2 },
]

const NewInvoiceEditor: React.VFC = () => (
  <Table variant="striped">
    <Thead>
      <Tr>
        <Th>項目</Th>
        <Th>値</Th>
      </Tr>
    </Thead>
    <Tbody>
      {data.map((element) => (
        <Tr key={element.order}>
          <Td>{element.label}</Td>
          <Td>
            <Input placeholder={element.label} />
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)

export default NewInvoiceEditor
