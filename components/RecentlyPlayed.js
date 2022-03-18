import { useState, useEffect } from 'react'
import {
    Box, Text, Heading, Grid, Center,
    Stack, Spacer, Button, HStack,
    VStack, Image, Avatar, AvatarGroup
} from '@chakra-ui/react'
import { MdPlayArrow, MdOutlinePause } from 'react-icons/md'
import Countdown from 'react-countdown'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const ItemCard = ({ image, avatar, listingType, expiration, user, name, categories, usdPrice, playing, price, currency, edition, colorMode }) => (
    <MotionBox
        borderRadius={6}
        whileHover={{ scale: 1.05 }}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
        }}
        overflow="hidden"
        bgColor={colorMode == 'dark' ? 'gray.800' : 'gray.200'}
    >
        <Box bgImage={image} h={220} p={2} bgSize="cover" bgRepeat="no-repeat">
            <Center h="125px">
                <Button size="sm" _hover={{ bgColor: 'gray.800' }} _focus={{ outline: 'none' }} bgColor="gray.800">
                    {playing ? <MdOutlinePause color="white" size={20} /> : <MdPlayArrow color="white" size={20} />}
                </Button>
            </Center>
            <Stack justify="flex-end">
                <HStack
                    borderRadius={10}
                    overflow="hidden"
                    style={{ justifyContent: 'space-between' }}
                    p={3}
                    backdropFilter="blur(5px)"
                >
                    <Box w={{ base: 'none', md: 'none', lg: 150 }}>
                        <Text fontSize="xs" color="white" fontWeight="bold" isTruncated>{name}</Text>
                        <Text fontSize="xs" color="white">{categories}</Text>
                        {
                            listingType == "auction" ?
                                <Countdown
                                    date={Date.now() * expiration}
                                    renderer={
                                        ({ hours, minutes, seconds }) =>
                                            <Text color="gray.300" fontSize="xs" textTransform="upper">
                                                {hours}h:{minutes}m:{seconds}s
                                            </Text>
                                    }
                                />
                                : null
                        }
                    </Box>
                    <Avatar src={user.avatar} size="md" />
                </HStack>
            </Stack>
        </Box>
        <HStack p={2} spacing={1} justify="space-between">
            <Stack spacing={1} fontSize="xs">
                <HStack spacing={1}>
                    <Avatar src={currency.logo} size="xs" />
                    {listingType == "auction" ? <Text>From</Text> : null}
                    <Text fontWeight="bold">{price}</Text>
                    <Text>{edition}</Text>
                </HStack>
                <HStack spacing={1}>
                    <Text fontWeight="bold">${usdPrice}</Text>

                    {
                        listingType == 'auction' ?
                            <Text textTransform="uppercase" fontWeight="bold">Open for Offers</Text>
                            :
                            <Text textTransform="uppercase" fontWeight="bold">{listingType}</Text>
                    }
                </HStack>
            </Stack>
            {
                listingType == 'auction' ?
                    <Button size="xs" _hover={{ bgColor: 'green.600' }} bgColor="#2EB745" borderRadius="full" color="white">Bid Now</Button>
                    :
                    <Button size="xs" _hover={{ bgColor: 'green.600' }} borderRadius="full" bgColor="#2EB745" color="white">Buy Now</Button>
            }

        </HStack>
    </MotionBox>
)

export const RecentlyPlayed = ({ data, colorMode }) => {
    return (
        <Stack mb={10}>
            <Heading mb={5}>
                Recently Played
            </Heading>
            <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={2}>
                {data.map((d, i) => (
                    <ItemCard colorMode={colorMode} key={d.listingId} {...d} />
                ))}
            </Grid>
        </Stack>
    )
}