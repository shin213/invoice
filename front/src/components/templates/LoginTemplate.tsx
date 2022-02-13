import React, { ReactNode, ReactText } from 'react'
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { FiSettings, FiMenu, FiBell, FiChevronDown } from 'react-icons/fi'
import { BiPlus } from 'react-icons/bi'
import { BsFileEarmarkCheck } from 'react-icons/bs'
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { IconType } from 'react-icons'
import { useUser } from '../../lib/cognito'
import { MdOutlineRestore } from 'react-icons/md'
import NotificationButtonItem from '../organisms/NotificationButton'

type LinkItemProps = {
  readonly name: string
  readonly icon: IconType
  readonly to: string
}
const LinkItems: LinkItemProps[] = [
  // { name: 'ホーム', icon: FiHome, to: '/' },
  { name: '領収書登録', icon: BiPlus, to: '/registrations' },
  { name: '承認', icon: BsFileEarmarkCheck, to: '/approvals' },
  { name: '保管', icon: MdOutlineRestore, to: '/store' },
  { name: '設定', icon: FiSettings, to: '/settings' },
]

const LoginTemplate = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  )
}

type SidebarProps = BoxProps & {
  readonly onClose: () => void
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => (
  <Box
    transition="3s ease"
    bg={useColorModeValue('white', 'gray.900')}
    borderRight="1px"
    borderRightColor={useColorModeValue('gray.200', 'gray.700')}
    w={{ base: 'full', md: 60 }}
    pos="fixed"
    h="full"
    {...rest}
  >
    <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Invoice
      </Text>
      <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
    </Flex>
    {LinkItems.map((link) => (
      <NavItem key={link.name} icon={link.icon} to={link.to}>
        {link.name}
      </NavItem>
    ))}
  </Box>
)

type NavItemProps = FlexProps & {
  readonly icon: IconType
  readonly to: string
  readonly children: ReactText
}
const NavItem = ({ icon, to, children, ...rest }: NavItemProps) => (
  <Link as={ReactRouterLink} to={to} style={{ textDecoration: 'none' }}>
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: 'cyan.400',
        color: 'white',
      }}
      {...rest}
    >
      {icon && (
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={icon}
        />
      )}
      {children}
    </Flex>
  </Link>
)

type MobileProps = FlexProps & {
  onOpen: () => void
}

const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const user = useUser()
  const navigate = useNavigate()
  const logout = () => {
    if (user == null) {
      alert('ログインセッションが切れています')
      navigate('/signin')
      return
    }
    user.signOut()
    navigate('/signin')
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Invoice
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <NotificationButtonItem />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  // src={
                  //   'assets/logo.webp'
                  // }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Admin</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <MenuItem>プロフィール</MenuItem>
              <MenuItem>設定</MenuItem>
              <MenuDivider />
              <MenuItem onClick={logout}>ログアウト</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

export default LoginTemplate
