import { Box, Stack, Heading, Image, HStack, Grid, Center, Button, Text } from "@chakra-ui/react"
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const CategoryCard = ({ image, category, colorMode }) => (
    <MotionBox
        bgColor={colorMode == 'dark' ? '#151515' : 'gray.200'}
        borderRadius={5}
        overflow="hidden"
        w="100%" h={70}
        whileHover={{ scale: 1.05 }}
        transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
        }}
        >
        <HStack fontWeight="bold">
            <Image src={image} objectFit="cover" boxSize={70} />
            <Center p={3}>
                <Text fontSize="md">{category}</Text>
            </Center>
        </HStack>
    </MotionBox>
)

export const Categories = ({ colorMode, categories }) => (
    <Stack w="100%" mb={10}>
        <Heading mb={5}>
            Categories
        </Heading>
        <Grid templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={3}>
            {
                categories.map((c, i) => (
                    <CategoryCard colorMode={colorMode} image={c.image} category={c.name} />
                ))
            }
        </Grid>
    </Stack>
)