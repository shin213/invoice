import { Table, Thead, Tr, Th, Tbody, Td, IconButton } from '@chakra-ui/react'
import React from 'react'
import { MdEdit } from 'react-icons/md'
import { Company } from '../../generated/graphql'

export type CompaniesTableProps = {
  companies: Company[]
}

const CompaniesTable: React.VFC<CompaniesTableProps> = ({ companies }: CompaniesTableProps) => (
  <Table variant="simple">
    <Thead>
      <Tr>
        <Th>企業名</Th>
        <Th>電話番号</Th>
        <Th>郵便番号</Th>
        <Th>県名</Th>
        <Th>市区町村</Th>
        <Th>以降の住所</Th>
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
          <Td>
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              // onClick={() => }
              variant="outline"
              aria-label="open menu"
              icon={<MdEdit />}
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
)

export default CompaniesTable
