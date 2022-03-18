import { useState, useEffect } from 'react'
import {
    Box, Stack, Container, HStack, Avatar, Spacer, Text, Button,
    useColorMode, Menu, MenuButton, MenuList, MenuItem,
    MenuItemOption, MenuGroup, MenuOptionGroup, useDisclosure,
    MenuDivider, Divider, VStack, Input, InputGroup, IconButton,
    InputLeftElement, Drawer, DrawerBody, DrawerFooter,
    DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
} from '@chakra-ui/react'
import {
    MdOutlineDashboard, MdPlaylistPlay, MdKeyboardArrowDown, MdOutlineMenu, MdOutlineClose,
    MdStackedBarChart, MdListAlt, MdQueueMusic, MdFeaturedPlayList, MdOutlineSearch, MdChevronRight,
    MdBrightnessMedium, MdLanguage, MdLogout, MdSearch, MdOutlineGroup, MdClose, MdModeNight
} from 'react-icons/md'
import { AudioPlayer } from './AudioPlayer'
import { useWallet } from 'use-wallet'

const UserItem = ({ avatar, name, totalSale, colorMode, ...rest }) => (
    <Box {...rest}>
        <HStack py={3}>
            <Avatar src="https://xircus.sfo3.cdn.digitaloceanspaces.com/xircuspunks/pm-slick-bayleaf.png?ts=1645430181" size="sm" />
            <Stack fontSize="sm" spacing={0}>
                <Text fontWeight="bold" w={200} isTruncated fontSize="xs">Gabby Lou</Text>
                <Text fontSize="xs">$3000</Text>
            </Stack>
        </HStack>
    </Box>
)

const MenuItems = ({ icon, text, colorMode, ...rest }) => (
    <Button
        _focus={{ border: 'none' }}
        {...rest}
        display="flex"
        align="center"
        _hover={{ bgColor: colorMode == 'dark' ? 'gray.700' : 'gray.300' }}
        bgColor="transparent" w="full"
        >
        {icon}
        <Text ml={5} fontSize="sm">{text}</Text>
        <Spacer />
        <MdChevronRight />
    </Button>
)

const nav = [
    { name: 'Discover', icon: <MdOutlineDashboard size={20} /> },
    { name: 'Artist', icon: <MdQueueMusic size={20} /> },
    { name: 'Tracks', icon: <MdStackedBarChart size={20} /> },
    { name: 'Genres', icon: <MdListAlt size={20} /> },
]

export const AppLayout = ({ children, music }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { colorMode, toggleColorMode } = useColorMode()
    const wallet = useWallet()
    
    return (
        <Box>
            <Stack h="100vh" bgColor={colorMode == 'dark' ? '#151515' : 'white' } display={{ base: 'none', sm: 'none', md: 'none', lg: 'block' }} pos="fixed" w="15vw" pt={5}>
                <Avatar bgColor="transparent" mb={5} ml={5} src="https://icoholder.com/files/img/6f7203a158209cb2e9143d6631cbb7c2.png" size="md" />
                {
                    nav.map((n, index) => (
                        <Button
                            color={colorMode === 'dark' ? 'white' : 'black'}
                            variant="ghost"
                            w="full"
                            display="flex"
                            style={{ justifyContent: 'flex-start' }}
                            >
                            {n.icon}
                            <Text pl={4} fontWeight="bold">{n.name}</Text>
                        </Button>
                    ))
                }
            </Stack>
            <Container maxW="container.lg" h="auto" bgColor={colorMode == 'dark' ? 'black' : 'white'} pb={115} >
                <HStack flex={1} justify={{ base: 'space-between', md: 'space-between', lg: 'flex-end' }} py={5}>
                    <Avatar display={{ base: 'block', md: 'block', lg: 'none' }} bgColor="transparent" src="https://icoholder.com/files/img/6f7203a158209cb2e9143d6631cbb7c2.png" size="md" />
                    <IconButton
                        _hover={{ bgColor: 'none' }}
                        _focus={{ outline: 'none' }}
                        bgColor="transparent"
                        display={{ base: 'block', md: 'block', lg: 'none' }}
                        onClick={onOpen}
                        icon={<MdOutlineMenu size={40} />}
                        color={colorMode == 'dark' ? 'white' : 'black'}
                        />
                    <Box display={{ base: 'none', md: 'none', lg: 'block' }}>
                        {
                            wallet.status === 'connected' ?
                                <Menu>
                                    <MenuButton
                                        _focus={{ border: 'none', }}
                                        display="flex"
                                        bgColor={colorMode === 'dark' ? 'gray.800' : 'gray.200'}
                                        borderRadius="full"
                                        h={30} as={Button}
                                        _hover={{ bgColor: colorMode == 'dark' ? 'gray.700' : 'gray.300' }}
                                        rightIcon={<MdKeyboardArrowDown />}
                                        >
                                        <HStack>
                                            <Avatar size="xs" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" />
                                            <Text>Jonathan Gomez</Text>
                                        </HStack>
                                    </MenuButton>
                                    <MenuList bgColor={colorMode === 'dark' ? 'gray.900' : 'gray.200'} border="none">
                                        <HStack spacing={4} p={3}>
                                            <Avatar size="sm" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" />
                                            <VStack align="flex-start" fontWeight="bold" spacing={0}>
                                                <Text>Jonathan Gomez</Text>
                                                <Text fontSize="xs" w={100} isTruncated>{wallet.account}</Text>
                                            </VStack>
                                        </HStack>
                                        <Divider />
                                        <MenuItems
                                            colorMode={colorMode}
                                            text="Apperance"
                                            icon={<MdBrightnessMedium color="gray.800" />}
                                            onClick={toggleColorMode}
                                        />
                                        <MenuItems
                                            colorMode={colorMode}
                                            text="My Collections"
                                            icon={<MdPlaylistPlay color="gray.800" />}
                                            onClick={() => { }}
                                        />
                                        <MenuItems
                                            colorMode={colorMode}
                                            text="Language"
                                            icon={<MdLanguage color="gray.800" />}
                                            onClick={() => { }}
                                        />
                                        <MenuItems
                                            colorMode={colorMode}
                                            text="Subscriptions"
                                            icon={<MdFeaturedPlayList color="gray.800" />}
                                            onClick={() => { }}
                                        />
                                        <MenuItems
                                            colorMode={colorMode}
                                            text="Disconnect"
                                            icon={<MdLogout color="gray.800" />}
                                            onClick={() => wallet.reset()}
                                        />
                                    </MenuList>
                                </Menu>
                                :
                                <Button borderRadius="full" size="sm" bgColor="#2EB745" color="white" onClick={() => wallet.connect()}>Connect Wallet</Button>
                        }
                    </Box>
                </HStack>
                {children}
            </Container>
            <Stack display={{ base: 'none', lg: 'block' }} pos="fixed" bgColor={colorMode == 'dark' ? '#151515' : 'white'} right={0} top={0} bottom={0} h="100vh" w="15vw" pt={5} px={3}>
                <InputGroup>
                    <InputLeftElement children={<MdSearch color='green.500' />}/>
                    <Input border="2px" borderColor="gray.500" _focus={{ outline: 'none' }} placeholder="Search Artist" borderRadius="full" />
                </InputGroup>
                <UserItem />
                <Button color="white" size="sm" bgColor="#2EB745" w="full" _hover={{ bgColor: 'green.400' }} borderRadius="full">View More</Button>
            </Stack>
            <AudioPlayer music={music} colorMode={colorMode} />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                size="sm"
                >
                <DrawerOverlay />
                <DrawerContent bgColor={colorMode == 'dark' ? '#151515' : 'white'}>
                    <DrawerBody>
                        <HStack align="center" justify="space-between">
                            <Avatar bgColor="transparent" src="https://icoholder.com/files/img/6f7203a158209cb2e9143d6631cbb7c2.png" size="md" />
                            <HStack>
                                <IconButton _focus={{ outline: 'none' }} onClick={toggleColorMode} variant="ghost" icon={colorMode == 'dark' ? <MdBrightnessMedium size={30} /> : <MdModeNight size={30} />} />
                                <IconButton _focus={{ outline: 'none' }} onClick={onClose} variant="ghost" icon={<MdClose size={30} />} />
                            </HStack>
                        </HStack>
                        <Stack mt={5}>
                            {
                                nav.map((n, index) => (
                                    <Button
                                        _focus={{ outline: 'none' }}
                                        color={colorMode === 'dark' ? 'white' : 'black'}
                                        variant="ghost"
                                        w="full"
                                        display="flex"
                                        style={{ justifyContent: 'flex-start' }}
                                        >
                                        {n.icon}
                                        <Text pl={4} fontWeight="bold">{n.name}</Text>
                                    </Button>
                                ))
                            }
                            <Stack display={wallet.status == 'connected' ? 'block' : 'none'}>
                                <Button
                                    _focus={{ outline: 'none' }}
                                    color={colorMode === 'dark' ? 'white' : 'black'}
                                    variant="ghost"
                                    w="full"
                                    display="flex"
                                    style={{ justifyContent: 'flex-start' }}
                                    >
                                    <MdPlaylistPlay />
                                    <Text pl={4} fontWeight="bold">My Collections</Text>
                                </Button>
                                <Button
                                    _focus={{ outline: 'none' }}
                                    color={colorMode === 'dark' ? 'white' : 'black'}
                                    variant="ghost"
                                    w="full"
                                    display="flex"
                                    style={{ justifyContent: 'flex-start' }}
                                    >
                                    <MdLanguage />
                                    <Text pl={4} fontWeight="bold">Language</Text>
                                </Button>
                                <Button
                                    _focus={{ outline: 'none' }}
                                    color={colorMode === 'dark' ? 'white' : 'black'}
                                    variant="ghost"
                                    w="full"
                                    display="flex"
                                    onClick={() => wallet.reset()}
                                    style={{ justifyContent: 'flex-start' }}
                                    >
                                    <MdLogout />
                                    <Text pl={4} fontWeight="bold">Disconnect</Text>
                                </Button>
                            </Stack>
                        </Stack>
                        <Button mt={3} w="full" display={wallet.status == 'connected' ? 'none' : 'block'} borderRadius="full" size="sm" bgColor="#2EB745" color="white" onClick={() => wallet.connect()}>Connect Wallet</Button>
                        <Stack mt={3} bgSize="cover" bgImage="https://www.artnews.com/wp-content/uploads/2022/02/Punk-It-Collage-e1644358865879.png?w=1200" display={wallet.status == 'connected' ? 'block' : 'none'} overflow="hidden" w="100%" borderRadius={10}>
                            <VStack p={2} bgColor="rgba(0,0,0,0.3)" h="full" w="full">
                                <Avatar size="lg" src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60" />
                                <VStack spacing={1} color="white">
                                    <Text fontSize="xl" fontWeight="bold">Jonathan Gomez</Text>
                                    <Text fontSize="md" w={200} fontWeight="bold" isTruncated>{wallet.account}</Text>
                                </VStack>
                            </VStack>
                        </Stack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}