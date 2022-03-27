import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import { Company } from '../../generated/graphql'
import { PrimaryButton } from '../atoms/Buttons'
import CompanyEditor from './CompanyEditor'

export type CompaniesTableProps = {
  companies: Company[]
}

const CompaniesTable: React.VFC<CompaniesTableProps> = ({ companies }: CompaniesTableProps) => {
  const [editingId, setEditingId] = useState<number | undefined>(undefined)

  const onClose = () => setEditingId(undefined)

  return (
    <Table variant="simple">
      {editingId != undefined && (
        <Modal isOpen={editingId != undefined} onClose={onClose} size="3xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>承認リクエストを送信する</ModalHeader>
            <ModalCloseButton />

            {/* 入力form */}
            <ModalBody>
              <CompanyEditor
                companyDefault={(() => {
                  const company = companies.find((c) => c.id === editingId)
                  if (company == undefined) {
                    throw new Error('company not found')
                  }
                  return company
                })()}
                setCompany={function () {
                  throw new Error('Function not implemented.')
                }}
              />
            </ModalBody>

            <ModalFooter>
              <PrimaryButton
                onClick={() => {
                  console.log('')
                }}
              >
                保存
              </PrimaryButton>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      <Thead>
        <Tr>
          <Th>企業名</Th>
          <Th>電話番号</Th>
          <Th>郵便番号</Th>
          <Th>県名</Th>
          <Th>市区町村</Th>
          {/* <Th>以降の住所</Th> */}
          <Th>編集</Th>
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
                onClick={() => setEditingId(company.id)}
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
}

export default CompaniesTable
