import { useState, useEffect } from 'react'
import { Box, Text, Heading, Stack, VStack, HStack } from '@chakra-ui/react'

export const Hero = () => (
    <VStack color="white" h={{ base: '20vh', md: '30vh', lg: '30vh' }} align="left" justify="flex-end" p={5} w="full" mb={10} borderRadius="md" bgSize="cover" bgImage="https://cdn.oneesports.gg/cdn-data/2021/11/LeagueofLegends_ArcaneEnemySoundtrackSongImagineDragonsJID-min.jpg">
        <Stack>
            <Text fontSize="lg" fontWeight="bold">Enemy - Imagine Dragons feat JID</Text>
            <Text>Rock | Alternative</Text>
        </Stack>
    </VStack>
)