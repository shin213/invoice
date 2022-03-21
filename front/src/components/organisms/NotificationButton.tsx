import React from 'react'
import { IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { FiBell } from 'react-icons/fi'

const dummyNotifications = [
  { content: 'テスト通知 1', id: 1 },
  { content: 'テスト通知 2', id: 2 },
  { content: 'テスト通知 3', id: 3 },
  { content: 'テスト通知 4', id: 4 },
  {
    content:
      'テスト通知 5 比較的長めの通知が来た場合には幅が大きくなるために通知欄が見づらくなるかもしれない',
    id: 5,
  },
]

const NotificationButtonItem = () => (
  <Menu>
    <MenuButton
      as={IconButton}
      size="lg"
      variant="ghost"
      aria-label="open menu"
      icon={<FiBell />}
    ></MenuButton>
    <MenuList maxWidth={300}>
      {dummyNotifications.map((notification) => (
        <MenuItem key={notification.id}>{`${notification.content}`}</MenuItem>
      ))}
    </MenuList>
  </Menu>
)

export default NotificationButtonItem
