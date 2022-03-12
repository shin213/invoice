import { Table, Thead, Tbody, Tr, Th, Td, Input } from '@chakra-ui/react'
import React, { memo, useCallback } from 'react'

export type EditorElement = {
  id: string
  order: number
  label: string
  value?: string | null
  valueType: ValueType
  own: boolean
}

export const enum ValueType {
  string = 'string',
  number = 'number',
  date = 'date',
}

export type NewInvoiceEditorProps = {
  body: EditorElement[]
  setBody: React.Dispatch<React.SetStateAction<EditorElement[]>>
}

const _NewInvoiceEditor: React.VFC<NewInvoiceEditorProps> = ({
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

  const sortedBody = body.sort((e1, e2) => e1.order - e2.order)

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>項目</Th>
          <Th>値</Th>
        </Tr>
      </Thead>
      <Tbody>
        {sortedBody.map(
          (element) =>
            !element.own && (
              <Tr key={element.id}>
                <Td>{element.label}</Td>
                <Td>
                  {/* TODO: Validation。NumberInputを使用するとplcaholderも制限されるので悩む。 */}
                  <Input
                    placeholder={element.label}
                    defaultValue={element.value || ''}
                    onChange={(e) => onChangeElement(element.id, e.target.value)}
                  />
                </Td>
              </Tr>
            ),
        )}
      </Tbody>
    </Table>
  )
}

const NewInvoiceEditor = memo(_NewInvoiceEditor)

export default NewInvoiceEditor
