import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import { Flex, Box, Text } from 'rebass'

const Library = () => {
    return (
        <>
            <Flex flexDirection={'column'}>
                <Box>
                    <Text fontSize={6} fontWeight="bold" mb={2}>
                        Your Library
                    </Text>
                </Box>

                <Flex
                    flexDirection={'row'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                    css={`
                        gap: 10px;
                    `}
                >
                    <Box>
                        <Text fontSize={40}>Under Construction 🏗</Text>
                    </Box>
                </Flex>
            </Flex>
            <Analytics />
        </>
    )
}

export default Library
