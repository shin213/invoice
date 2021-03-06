import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast,
  Table,
  Input,
  Tbody,
  Td,
  Tr,
  Select,
} from '@chakra-ui/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useKana } from 'react-use-kana'
import { Company, useCreateUnconfirmedUserMutation } from '../../../generated/graphql'
import { PrimaryButton } from '../../atoms/Buttons'
import AutocompleteInput from '../../molecules/AutoCompleteInput'

export type UnconfirmedUserFormData = {
  email: string
  familyName: string
  givenName: string
  familyNameFurigana: string
  givenNameFurigana: string
  isAdmin: boolean
  employeeCode: string
  companyId?: number | null
}

export type NewUserModalProps = {
  readonly isOpen: boolean
  readonly onClose: () => void
  readonly companies: readonly Pick<Company, 'id' | 'name'>[]
  readonly createUnconfirmedUser: ReturnType<typeof useCreateUnconfirmedUserMutation>[0]
}

const NewUserModal: React.VFC<NewUserModalProps> = ({
  isOpen,
  onClose,
  companies,
  createUnconfirmedUser,
}: NewUserModalProps) => {
  const toast = useToast()
  const [user, setUser] = useState<UnconfirmedUserFormData>({
    email: '',
    familyName: '',
    givenName: '',
    familyNameFurigana: '',
    givenNameFurigana: '',
    employeeCode: '',
    isAdmin: true,
  })
  const onChangeElement = useCallback(
    async <T extends keyof UnconfirmedUserFormData>(
      elementId: T,
      value: UnconfirmedUserFormData[T],
    ) => {
      const _user: UnconfirmedUserFormData = { ...user }
      _user[elementId] = value
      setUser(_user)
    },
    [user],
  )

  const [familyKana, setFamilyKana] = useState('')
  const [givenKana, setGivenKana] = useState('')
  const { kana: _familyKana, setKanaSource: setFamilyKanaSrc } = useKana()
  const { kana: _givenKana, setKanaSource: setGivenKanaSrc } = useKana()
  useEffect(() => {
    setFamilyKana(_familyKana)
    setGivenKana(_givenKana)
  }, [_familyKana, _givenKana])

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>??????????????????</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>?????????(??????)</Td>
                <Td>
                  <AutocompleteInput
                    items={companies.map((c) => ({
                      id: c.id,
                      label: c.name,
                      completableStr: c.name,
                    }))}
                    onSelect={(i) => onChangeElement('companyId', i.id)}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>?????????????????????(??????)</Td>
                <Td>
                  <Input onChange={(e) => onChangeElement('email', e.target.value)} />
                </Td>
              </Tr>
              <Tr>
                <Td>???</Td>
                <Td>
                  <Input
                    onChange={(e) => {
                      onChangeElement('familyName', e.target.value)
                      setFamilyKanaSrc(e.target.value)
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>???</Td>
                <Td>
                  <Input
                    onChange={(e) => {
                      onChangeElement('givenName', e.target.value)
                      setGivenKanaSrc(e.target.value)
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>???(????????????)</Td>
                <Td>
                  <Input
                    value={familyKana}
                    onChange={(e) => {
                      setFamilyKana(e.target.value)
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>???(????????????)</Td>
                <Td>
                  <Input
                    value={givenKana}
                    onChange={(e) => {
                      setGivenKana(e.target.value)
                    }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>??????????????????</Td>
                <Td>
                  <Input onChange={(e) => onChangeElement('employeeCode', e.target.value)} />
                </Td>
              </Tr>
              <Tr>
                <Td>??????</Td>
                <Td>
                  <Select
                    onChange={(e) => onChangeElement('isAdmin', e.target.value === 'true')}
                    defaultValue="false"
                  >
                    <option value="false">??????</option>
                    <option value="true">?????????</option>
                  </Select>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter>
          <PrimaryButton
            onClick={() => {
              if (!user.email) {
                toast({
                  description: 'E???????????????????????????????????????',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
                return
              }
              const { companyId, ...rest } = user
              if (!companyId) {
                toast({
                  description: '???????????????????????????????????????',
                  status: 'error',
                  duration: 5000,
                  isClosable: true,
                })
                return
              }
              createUnconfirmedUser({
                variables: {
                  newUnconfirmedUser: {
                    companyId,
                    ...rest,
                    familyNameFurigana: familyKana,
                    givenNameFurigana: givenKana,
                  },
                },
              })
            }}
          >
            ??????
          </PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default NewUserModal
