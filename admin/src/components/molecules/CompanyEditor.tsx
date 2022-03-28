import { Table, Tr, Tbody, Td, Input, useToast } from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { usePostalJp } from 'use-postal-jp'
import { Prefecture } from '../../generated/graphql'
import { PREFECTURES_JP_EN } from '../../utils/prefecture'

export type CompanyFormData = {
  name: string
  phoneNumber?: string | null
  prefecture?: Prefecture | null
  city?: string | null
  postalCode?: string | null
  restAddress?: string | null
}

export type CompanyEditorProps = {
  companyDefault: CompanyFormData
  setCompany: React.Dispatch<React.SetStateAction<CompanyFormData>>
}

const _CompanyEditor: React.VFC<CompanyEditorProps> = ({
  companyDefault,
  setCompany,
}: CompanyEditorProps) => {
  const [postalCode, setPostalCode] = useState('')
  const [address, addressLoading, error] = usePostalJp(postalCode, postalCode.length >= 7)
  const onChangeElement = useCallback(
    async (elementId: keyof CompanyFormData, value: string) => {
      if (elementId === 'postalCode') {
        setPostalCode(value)
      }
      const company = {
        ...companyDefault,
        [elementId]: value,
        prefecture: address?.prefecture
          ? (PREFECTURES_JP_EN as Record<string, Prefecture>)[address?.prefecture]
          : undefined,
        city: address?.address1,
      }
      setCompany(company)
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
const CompanyEditor = React.memo(_CompanyEditor)

export default CompanyEditor
