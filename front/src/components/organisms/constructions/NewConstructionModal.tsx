import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Tbody,
  Td,
  Tr,
  useToast,
} from '@chakra-ui/react'
import React, { useCallback, useState } from 'react'
import { ShownName, useCreateConstructionMutation } from '../../../generated/graphql'
import { autoCompletabeUser } from '../../../utils/user'
import { PrimaryButton } from '../../atoms/Buttons'
import AutoCompleteInput from '../../molecules/AutoCompleteInput'

export type NewConstructionFormData = {
  name: string
  code: string
  shownName: ShownName
  customShownName: string
  userId: string
}

export type NewConstructionModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly createConstruction: ReturnType<typeof useCreateConstructionMutation>[0]
  readonly users: readonly {
    id: string
    familyName: string
    givenName: string
    familyNameFurigana: string
    givenNameFurigana: string
  }[]
}

const NewConstructionModal: React.VFC<NewConstructionModalProps> = ({
  isOpen,
  onClose,
  createConstruction,
  users,
}: NewConstructionModalProps) => {
  const toast = useToast()
  const [construction, setConstruction] = useState<NewConstructionFormData>({
    name: '',
    code: '',
    shownName: 'name',
    customShownName: '',
    userId: '',
  })
  const onChangeElement = useCallback(
    async <T extends keyof NewConstructionFormData>(
      elementId: T,
      value: NewConstructionFormData[T],
    ) => {
      const _construction: NewConstructionFormData = { ...construction }
      _construction[elementId] = value
      setConstruction(_construction)
    },
    [construction],
  )
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>工事登録</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>工事名(必須)</Td>
                <Td>
                  <Input onChange={(e) => onChangeElement('name', e.target.value)} />
                </Td>
              </Tr>
              <Tr>
                <Td>工事コード</Td>
                <Td>
                  <Input onChange={(e) => onChangeElement('code', e.target.value)} />
                </Td>
              </Tr>
              <Tr>
                <Td>権限</Td>
                <Td>
                  <RadioGroup
                    onChange={(e) => onChangeElement('shownName', e as ShownName)}
                    defaultValue="name"
                  >
                    <Stack direction="row">
                      <Radio value="name">工事名</Radio>
                      <Radio value="code">工事コード</Radio>
                      <Radio value="custom">
                        カスタム
                        <Input
                          onChange={(e) => onChangeElement('customShownName', e.target.value)}
                        />
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </Td>
              </Tr>
              <Tr>
                <Td>ユーザー</Td>
                <Td>
                  <AutoCompleteInput
                    items={users.map((u) => autoCompletabeUser(u))}
                    onSelect={(i) => onChangeElement('userId', i.id)}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter>
          <PrimaryButton
            onClick={() => {
              if (!construction.name) {
                toast({
                  description: '工事名を入力してください。',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
                return
              }
              if (!construction.code) {
                toast({
                  description: '工事コードを入力してください。',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
                return
              }
              if (construction.shownName === 'custom' && construction.customShownName === '') {
                toast({
                  description: 'カスタム表示名を入力してください。',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
                return
              }
              if (!construction.userId) {
                toast({
                  description: 'ユーザーを選択してください。',
                  status: 'error',
                  duration: 5000,
                  position: 'top',
                  isClosable: true,
                })
              }
              createConstruction({
                variables: {
                  newConstruction: {
                    name: construction.name,
                    code: construction.code,
                    shownName: construction.shownName,
                    customShownName: construction.customShownName,
                    remarks: '',
                    userIds: [construction.userId],
                  },
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

export default NewConstructionModal
