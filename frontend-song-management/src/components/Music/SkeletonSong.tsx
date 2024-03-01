import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Skeleton from 'react-loading-skeleton'
import { Box, Flex, Text } from 'rebass'

import {
    StyledOption,
    EditIcon,
    StyledRemoveIcon,
    Button,
    Button2,
    StyledButton,
    playTitle,
    boxStyle,
    hiddenOnSmallScreen,
    titleStyle,
    StyledOptionContainer,
    StyledlementsMenuebarContent,
    Overlay,
    ModalContent,
    formatDate,
    StyledSpan,
} from './Music.style'

const spotifyStyle = css`
    width: 100%;
    color: #1f3044;
    padding: 4px 4px;
    border-radius: 8px;
    background-color: #0d1117;
    /* max-width: 800px; */
    &:hover {
        background-color: #161b22;
    }
    transition: all 0.1s ease;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`
const SkeletonSong = () => {
    return (
        <>
            {/* <SkeletonBox> */}
            <Flex
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                css={spotifyStyle.styles}
            >
                <Flex
                    flexDirection={'row'}
                    alignItems={'center'}
                    flex={1.5}
                    css={playTitle.styles}
                >
                    <Box ml={2}>
                        <Skeleton circle width={50} height={50} />{' '}
                        {/* Mimics the song image */}
                    </Box>
                    {/* <Box>
                        <Skeleton circle width={50} height={50} />
                    </Box> */}
                    <Flex
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                        css={titleStyle.styles}
                    >
                        <Box>
                            <Text fontSize={16} fontWeight="bold">
                                <Skeleton width={100} />{' '}
                                {/* Mimics the song title */}
                            </Text>
                        </Box>
                        <Box>
                            <Text fontSize={16} fontWeight="bold">
                                <Skeleton width={100} />{' '}
                                {/* Mimics the song title */}
                            </Text>
                        </Box>
                    </Flex>
                </Flex>
                <Box
                    css={[boxStyle.styles, hiddenOnSmallScreen.styles]}
                    flex={1}
                    mr={2}
                >
                    <Text
                        fontSize={14}
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            marginLeft: '90px',
                        }}
                    >
                        <Skeleton width={100} />{' '}
                    </Text>
                </Box>
                <Box
                    css={[boxStyle.styles, hiddenOnSmallScreen.styles]}
                    flex={1}
                >
                    <Text
                        fontSize={14}
                        style={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            marginLeft: '90px',
                        }}
                    >
                        <Skeleton width={100} />{' '}
                    </Text>
                </Box>
            </Flex>
            {/* </SkeletonBox> */}
        </>
    )
}

// const SkeletonBox = styled.div`
//     display: flex;
//     height: 100px;
//     padding: 1rem;
//     border-radius: 10px;
//     /* Mimics the styles from Music.style.ts */
//     background-color: #e1f2f7;
//     color: #010101;
//     border: none;
//     border-radius: 10px;
//     font-size: 16px;
//     cursor: pointer;
//     transition: background-color 0.3s ease;
// `

export default SkeletonSong
