import { Table, Thead, Tr, Th, Tbody, Td, Input, useToast } from '@chakra-ui/react'
import React, { memo, useCallback, useState } from 'react'
import { usePostalJp } from 'use-postal-jp'
import { Company } from '../../generated/graphql'

export type CompanyEditorProps = {
  companyDefault: Company
  setCompany: React.Dispatch<React.SetStateAction<Company>>
}

const _CompanyEditor: React.VFC<CompanyEditorProps> = ({
  companyDefault,
  setCompany,
}: CompanyEditorProps) => {
  const [postalCode, setPostalCode] = useState('')
  const [address, addressLoading, error] = usePostalJp(postalCode, postalCode.length >= 7)
  const onChangeElement = useCallback(
    async (elementId: keyof Company, value: string) => {
      if (elementId === 'postalCode') {
        setPostalCode(value)
      }
      const element = companyDefault[elementId]
      if (element) {
        element.value = value
        setCompany(companyDefault)
      }
    },
    [companyDefault],
  )
  const toast = useToast()
  if (error != null) {
    toast({
      description: error.message,
      status: 'error',
      position: 'top',
      isClosable: true,
    })
  }
  return (
    <Table variant="simple">
      <Tbody>
        <Tr>
          <Td>企業名</Td>
          <Td>
            <Input onChange={(e) => onChangeElement('name', e.target.value)} />
          </Td>
        </Tr>
        <Tr>
          <Td>電話番号</Td>
          <Td>
            <Input onChange={(e) => onChangeElement('phoneNumber', e.target.value)} />
          </Td>
        </Tr>
        <Tr>
          <Td>郵便番号(ハイフン不要)</Td>
          <Td>
            <Input onChange={(e) => onChangeElement('postalCode', e.target.value)} />
          </Td>
        </Tr>
        <Tr>
          <Td>県名</Td>
          <Td>{!addressLoading && address?.prefecture}</Td>
        </Tr>
        <Tr>
          <Td>市区町村</Td>
          <Td>{!addressLoading && address?.address1}</Td>
        </Tr>
        <Tr>
          <Td>以降の住所</Td>
          <Td>
            <Input onChange={(e) => onChangeElement('restAddress', e.target.value)} />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  )
}
const CompanyEditor = memo(_CompanyEditor)

export default CompanyEditor
