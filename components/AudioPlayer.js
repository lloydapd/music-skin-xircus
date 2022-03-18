import { useState, useEffect } from 'react'
import {
    Box, HStack, VStack, Stack, IconButton,
    Slider, SliderFilledTrack, SliderTrack,
    SliderThumb, Image, Text, Heading, Button,
    useColorMode, Spacer, useDisclosure, Slide,
} from '@chakra-ui/react'
import {
    MdShuffle, MdPlayArrow, MdPause, MdSkipPrevious,
    MdSkipNext, MdRepeat, MdRepeatOne, MdVolumeUp,
    MdVolumeOff, MdQueueMusic, MdClose
} from 'react-icons/md'
import { useAudio } from 'react-use'
import useGlobal from '../hooks/useGlobal'

const ControlButton = ({ icon, colorMode, ...rest }) => (
    <IconButton
        icon={icon}
        size="md"
        bgColor="transparent"
        borderRadius="full"
        _hover={{ bgColor: colorMode == 'dark' ? 'gray.900' : 'gray.400' }}
        _focus={{ outline: 'none' }}
        { ...rest }
        />
)

export const AudioPlayer = ({ music, colorMode }) => {
    const [state, actions] = useGlobal(['item'])
    const { isOpen, onToggle } = useDisclosure()
    const [song, setSong] = useState("")
    const [audio, states, controls, ref] = useAudio({
        src: `http://localhost:3000/${state.item.url}`,
        autoPlay: true,
        preload: "metadata"
    })

    const currentMins = Math.floor((states.time % 3600) / 60)
    const currentSec = Math.floor(states.time % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })

    const durationMins = Math.floor((states.duration % 3600) / 60)
    const durationSec = Math.floor(states.duration % 60).toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })

    useEffect(() => {
        setSong(state.item)
    }, [])

    return (
        <Box>
            <HStack spacing={5} display={state.item ? 'flex' : 'none'} h={110} bgColor={colorMode == 'dark' ? '#151515' : 'gray.200'} pos="fixed" bottom={0} left={0} right={0} px={5}>
                <HStack flex={1}>
                    <Image onClick={onToggle} display={state.item ? 'block' : 'none'} borderRadius="lg" src={state.item.image} boxSize={90} />
                    <Stack display={state.item ? 'block' : 'none'} spacing={0} ml={5}>
                        <Text fontSize="md" fontWeight="bold" w={180} isTruncated>{state.item && state.item.name}</Text>
                        <Text fontSize="sm">{state.item && state.item.categories.join(' | ')}</Text>
                    </Stack>
                    <Box display={state.item ? 'block' : 'none'}>
                        {
                            state.item && state.item.listingType == 'auction' ?
                                <Button display={{ base: 'none', md: 'none', lg: 'block' }} _hover={{ bgColor: 'green.500' }} borderRadius="full" size="sm" bgColor="#2EB745">Bid Now</Button>
                                :
                                <Button display={{ base: 'none', md: 'none', lg: 'block' }} _hover={{ bgColor: 'green.500' }} borderRadius="full" size="sm" bgColor="#2EB745" >Buy Now</Button>
                        }
                    </Box>
                </HStack>
                <Stack flex={2} display={{ base: 'none', md: 'none', lg: 'flex' }}>
                    <HStack spacing={5} justify="center">
                        <ControlButton icon={<MdShuffle />} />
                        <ControlButton icon={<MdSkipPrevious size={30} />} />
                        <ControlButton
                            onClick={() => { states.playing ? controls.pause() : controls.play() }}
                            icon={states.playing ? <MdPause size={40} /> : <MdPlayArrow size={40} />}
                            size="lg"
                        />
                        <ControlButton icon={<MdSkipNext size={30} />} />
                        <ControlButton icon={<MdRepeat />} />
                    </HStack>
                    <HStack spacing={4}>
                        <Text fontWeight="bold" fontSize="xs">{currentMins}:{currentSec}</Text>
                        <Slider aria-label='slider-ex-1' max={states.duration} value={states.time} onChange={(val) => controls.seek(val)}>
                            <SliderTrack bgColor="gray.400">
                                <SliderFilledTrack bgColor="gray.600" />
                            </SliderTrack>
                            <SliderThumb _focus={{ outline: 'none' }} bgColor="gray.500" />
                        </Slider>
                        <Text fontWeight="bold" fontSize="xs">{durationMins}:{durationSec}</Text>
                    </HStack>
                </Stack>

                <HStack w={210} display={{ base: 'none', md: 'none', lg: 'flex' }}>
                    <ControlButton icon={<MdQueueMusic />} />
                    <ControlButton
                        onClick={() => { states.muted ? controls.unmute() : controls.mute() }}
                        icon={states.muted ? <MdVolumeOff /> : <MdVolumeUp />}
                    />
                    <Slider
                        type="range"
                        max={1} min={0.0}
                        step={0.1}
                        defaultValue={0.3}
                        aria-label='slider-ex-1'
                        onChange={(val) => controls.volume(val)}
                        value={state.volume}
                    >
                        <SliderTrack bgColor="gray.400">
                            <SliderFilledTrack bgColor="gray.600" />
                        </SliderTrack>
                        <SliderThumb _focus={{ outline: 'none' }} bgColor="gray.500" />
                    </Slider>
                </HStack>
                {audio}

            </HStack>
            <Slide in={isOpen} direction="bottom">
                <Box h={520} bgColor={colorMode == 'dark' ? "#151515" : 'gray.300'} p="20px" css={{ borderRadius: '10px', zIndex: 9999 }}>
                    <HStack>
                        <IconButton bgColor="gray.600" onClick={onToggle} icon={<MdClose />} />
                        <Spacer />
                        {
                            state.item.listingType == "auction" ?
                                <Button bgColor="#22C95C" style={{ borderRadius: '30px' }}>Bid now</Button>
                                :
                                <Button bgColor="#22C95C" style={{ borderRadius: '30px' }}>Buy now</Button>
                        }
                    </HStack>
                    <Box align="center" mt="20px">
                        <Image src={state.item.image} h="200px" style={{ borderRadius: '10px' }} />
                    </Box>
                    <Box align="center" mt="20px">
                        <Text fontSize="20px" fontWeight="bold">{state.item.name}</Text>
                    </Box>
                    <HStack justify="center" mt="20px">
                        <ControlButton icon={<MdShuffle />} />
                        <ControlButton icon={<MdSkipPrevious size={30} />} />
                        <ControlButton
                            onClick={() => { states.playing ? controls.pause() : controls.play() }}
                            icon={states.playing ? <MdPause size={40} /> : <MdPlayArrow size={40} />}
                            size="lg"
                        />
                        <ControlButton icon={<MdSkipNext size={30} />} />
                        <ControlButton icon={<MdRepeat />} />
                    </HStack>
                    <HStack mt="20px" pl="30px" pr="30px" spacing={5} align="center">
                        <Text fontSize="12px" fontWeight="bold">{currentMins}:{currentSec}</Text>
                        <Box style={{ flex: 1 }}>
                            <Slider
                                aria-label='slider-ex-4'
                                value={states.time}
                                onChange={(val) => controls.seek(val)}
                                max={states.duration}
                                defaultValue={0}>
                                <SliderTrack bg='black'>
                                    <SliderFilledTrack bg='white' />
                                </SliderTrack>
                                <SliderThumb boxSize={3}>
                                    <Box color='white' />
                                </SliderThumb>
                            </Slider>
                        </Box>
                        <Text fontSize="12px" fontWeight="bold">{durationMins}:{durationSec}</Text>
                    </HStack>
                    <HStack mt={5} px={10}>
                        <ControlButton
                            onClick={() => { states.muted ? controls.unmute() : controls.mute() }}
                            icon={states.muted ? <MdVolumeOff /> : <MdVolumeUp />}
                        />
                        <Slider
                            aria-label='slider-ex-4'
                            onChange={val => controls.volume(val)}
                            type="range"
                            step={0.1}
                            min={0.0}
                            max={1.0}
                            value={state.volume}
                            defaultValue={0.3}
                        >
                            <SliderTrack bg='black'>
                                <SliderFilledTrack bg='white' />
                            </SliderTrack>
                            <SliderThumb>
                                <Box color='white' />
                            </SliderThumb>
                        </Slider>
                        <ControlButton icon={<MdQueueMusic />} />
                    </HStack>
                </Box>
            </Slide>
        </Box>
    )
}