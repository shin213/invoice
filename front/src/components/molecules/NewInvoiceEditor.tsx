import { Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react'
import React, { memo, useCallback } from 'react'

export type EditorElement = {
  id: string
  order: number
  label: string
  value?: string | null
  own: boolean
}

export type NewInvoiceEditorProps = {
  elements: EditorElement[] // data for rendering
  body: EditorElement[]
  setBody: React.Dispatch<React.SetStateAction<EditorElement[]>>
}

const _NewInvoiceEditor: React.VFC<NewInvoiceEditorProps> = ({
  elements,
  body,
  setBody,
}: NewInvoiceEditorProps) => {
  const onChangeElement = useCallback(
    async (elementId: string, value: string) => {
      const element = body.find((elm) => elm.id === elementId)
      if (element) {
        element.value = value
        setBody(body)
      }
    },
    [body],
  )

  const sortedElements = elements.sort((e1, e2) => e1.order - e2.order)

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>項目</Th>
          <Th>値</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortedElements.map((element) => (
          <Tr key={element.id}>
            <Td css={element.own && { background: 'lightGray' }}>{element.label}</Td>
            <Td css={element.own && { background: 'lightGray' }}>
              <Input
                placeholder={element.own ? '※この項目は請求先で入力します' : element.label}
                defaultValue={element.value || ''}
                isReadOnly={element.own}
                onChange={(e) => onChangeElement(element.id, e.target.value)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  )
}

const NewInvoiceEditor = memo(_NewInvoiceEditor)

export default NewInvoiceEditor
