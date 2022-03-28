import { Table, Thead, Tr, Th, Tbody, Td, IconButton } from '@chakra-ui/react'
import React, { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
// import { MdEdit } from 'react-icons/md'
import { Company, useCreateCompanyMutation } from '../../../generated/graphql'
import NewCompanyModal from './NewCompanyModal'

export type CompaniesTableProps = {
  readonly companies: readonly Company[]
  readonly createCompany: ReturnType<typeof useCreateCompanyMutation>[0]
}

const CompaniesTable: React.VFC<CompaniesTableProps> = ({
  companies,
  createCompany,
}: CompaniesTableProps) => {
  const [editingId, setEditingId] = useState<number | undefined>(undefined)

  const onClose = () => setEditingId(undefined)

  return (
    <>
      <IconButton
        onClick={() => setEditingId(-1)}
        variant="outline"
        aria-label="open menu"
        icon={<AiOutlinePlus />}
      />
      <Table variant="simple">
        <NewCompanyModal
          isOpen={editingId != undefined}
          onClose={onClose}
          companyDefault={companies.find((company) => company.id === editingId)}
          createCompany={createCompany}
        />
        <Thead>
          <Tr>
            <Th>企業名</Th>
            <Th>電話番号</Th>
            <Th>郵便番号</Th>
            <Th>県名</Th>
            <Th>市区町村</Th>
            {/* <Th>以降の住所</Th> */}
            {/* <Th>編集</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {companies.map((company) => (
            <Tr key={company.id}>
              <Td>{company.name}</Td>
              <Td>{company.phoneNumber ?? '未登録'}</Td>
              <Td>{company.postalCode ?? '未登録'}</Td>
              <Td>{company.prefecture ?? '未登録'}</Td>
              <Td>{company.city ?? '未登録'}</Td>
              {/* <Td>{company.restAddress ?? '未登録'}</Td> */}
              {/* <Td>
                <IconButton
                  onClick={() => setEditingId(company.id)}
                  variant="outline"
                  aria-label="open menu"
                  icon={<MdEdit />}
                />
              </Td> */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  )
}

export default CompaniesTable
