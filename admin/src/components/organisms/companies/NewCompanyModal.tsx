import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { NewCompanyInput, useCreateCompanyMutation } from '../../../generated/graphql'
import { PrimaryButton } from '../../atoms/Buttons'
import CompanyEditor, { CompanyFormData } from '../../molecules/CompanyEditor'

export type NewCompanyModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly companyDefault?: CompanyFormData
  readonly createCompany: ReturnType<typeof useCreateCompanyMutation>[0]
}

const _NewCompanyModal: React.VFC<NewCompanyModalProps> = ({
  isOpen,
  onClose,
  companyDefault,
  createCompany,
}: NewCompanyModalProps) => {
  const toast = useToast()
  const [company, setCompany] = useState<NewCompanyInput>(companyDefault ?? { name: '' })
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>企業作成</ModalHeader>
        <ModalCloseButton />

        {/* 入力form */}
        <ModalBody>
          <CompanyEditor
            companyDefault={
              companyDefault ?? {
                name: '',
              }
            }
            setCompany={setCompany}
          />
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

const NewCompanyModal = React.memo(_NewCompanyModal)

export default NewCompanyModal
