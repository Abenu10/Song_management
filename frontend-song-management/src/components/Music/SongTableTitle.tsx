import { css } from '@emotion/react'
import { Flex, Box, Text } from 'rebass'

const SongTableTitle = () => {
    const titleStyle = css`
        width: 100%;
        border-radius: 10px;
        background: #161b22;
        color: #b7b9bb;
    `
    return (
        <Flex
            flexDirection="row"
            justifyContent="space-between"
            css={titleStyle.styles}
            p={[2]}
        >
            <Box flex={2}>
                <Text fontSize={[2, 3, 4]} fontWeight="bold">
                    Title
                </Text>
            </Box>
            <Box flex={1}>
                <Flex justifyContent={'center'}>
                    <Box>
                        <Text fontSize={[2, 3, 4]} fontWeight="bold">
                            Album
                        </Text>
                    </Box>
                </Flex>
            </Box>
            <Box flex={1}>
                <Flex justifyContent={'end'}>
                    <Box>
                        <Text fontSize={[2, 3, 4]} fontWeight="bold">
                            Date Added
                        </Text>
                    </Box>
                </Flex>
            </Box>
        </Flex>
    )
}

export default SongTableTitle
