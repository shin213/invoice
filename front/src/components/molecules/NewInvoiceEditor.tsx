import { Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react'
import React from 'react'

// const data = [
//   { label: '取引先名', order: 1 },
//   { label: '工事名', order: 2 },
// ]

export type NewInvoiceEditorProps = {
  elements: {
    order: number
    label: string
    value?: string | null
  }[]
}

const NewInvoiceEditor: React.VFC<NewInvoiceEditorProps> = ({
  elements,
}: NewInvoiceEditorProps) => {
  const sortedElements = elements.sort((e1, e2) => e1.order - e2.order)

  return (
    <Table variant="striped">
      <Thead>
        <Tr>
          <Th>項目</Th>
          <Th>値</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortedElements.map((element) => (
          <Tr key={element.order}>
            <Td>{element.label}</Td>
            <Td>
              <Input placeholder={element.label} defaultValue={element.value || ''} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

export default NewInvoiceEditor
