import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Tr,
  useToast,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { usePostalJp } from 'use-postal-jp'
import { NewCompanyInput, Prefecture, useCreateCompanyMutation } from '../../../generated/graphql'
import { PREFECTURES_JP_EN } from '../../../utils/prefecture'
import { PrimaryButton } from '../../atoms/Buttons'

type CompanyFormData = {
  name: string
  phoneNumber: string
  prefecture?: Prefecture | null
  city: string
  postalCode: string
  restAddress: string
}

export type NewCompanyModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly companyDefault?: CompanyFormData
  readonly createCompany: ReturnType<typeof useCreateCompanyMutation>[0]
}

const NewCompanyModal: React.VFC<NewCompanyModalProps> = ({
  isOpen,
  onClose,
  companyDefault,
  createCompany,
}: NewCompanyModalProps) => {
  const toast = useToast()
  const [company, setCompany] = useState<NewCompanyInput>(
    companyDefault ?? { name: '', phoneNumber: '', city: '', postalCode: '', restAddress: '' },
  )

  const [postalCode, setPostalCode] = useState('')
  const [address, addressLoading, error] = usePostalJp(postalCode, postalCode.length >= 7)
  const onChangeElement = useCallback(
    async (elementId: keyof CompanyFormData, value: string) => {
      if (elementId === 'postalCode') {
        setPostalCode(value)
      }
      const _company = {
        ...company,
        [elementId]: value,
        prefecture: address?.prefecture
          ? (PREFECTURES_JP_EN as Record<string, Prefecture>)[address?.prefecture]
          : undefined,
        city: address?.address1 || '',
      }
      setCompany(_company)
    },
    [companyDefault],
  )
  if (error != null) {
    toast({
      description: error.message,
      status: 'error',
      position: 'top',
      isClosable: true,
    })
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>企業作成</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
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
        </ModalBody>

        <ModalFooter>
          <PrimaryButton
            onClick={() => {
              if (!company.name) {
                toast({
                  description: '企業名を入力してください。',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
                return
              }
              createCompany({
                variables: {
                  newCompany: company,
                },
              })
            }}
          >
            作成
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NewCompanyModal
