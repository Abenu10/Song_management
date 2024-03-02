import { backgroundColor } from 'styled-system'
import { Box, Flex, Text } from 'rebass'
import { SlOptionsVertical } from 'react-icons/sl'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa6'
import { MdOutlineEdit } from 'react-icons/md'
import { MdDelete } from 'react-icons/md'
import { FaRegCircleCheck } from 'react-icons/fa6'

import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

export const StyledOption = styled(SlOptionsVertical)`
    position: relative; // Set position to relative
    z-index: 1; // Set a lower z-index value
    margin-right: 10px;
    font-size: 20px;
`
export const EditIcon = styled(MdOutlineEdit)`
    margin-right: 10px;
    font-size: 20px;
    z-index: 0px;
`
export const StyledRemoveIcon = styled(MdDelete)`
    margin-right: 10px;
    font-size: 20px;
`

export const Button = styled.button`
    padding: 15px 30px;
    background-color: #1f6fd0;
    color: #e1f2f7;
    border: none;
    border-radius: 10px;
    font-size: 16px;

    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        font-weight: bold;
        transform: scale(1.05);
    }
`
export const Button2 = styled.button`
    padding: 15px 30px;
    background-color: #e6e6e6;
    color: #010101;

    border: none;
    border-radius: 10px;
    font-size: 16px;

    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        font-weight: bold;
        transform: scale(1.05);
    }
`

export const StyledButton = styled.div`
    padding: 5px 2px;
    border: none;
`

export const playTitle = css`
    gap: 20px;
`

export const boxStyle = css`
    margin-right: 10px; /* Adjust the margin as needed */
`

export const hiddenOnSmallScreen = css`
    @media (max-width: 768px) {
        display: none;
    }
`
export const titleStyle = css`
    height: 40px;
`
export const StyledOptionContainer = css`
    cursor: pointer;
    position: relative;
    color: #010101;
`
export const StyledlementsMenuebarContent = css`
    &:hover {
        color: #1ba098;
    }
    transition: 0.4s;
`
// Define animation keyframes
export const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

// Define styles for the modal overlay
const overlayStyles = css`
    position: fixed;
    z-index: 20;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

// Define styles for the modal content
const modalStyles = css`
    background-color: #010101;
    display: flex;
    flex-direction: column;
    background-color: #f0f8ff;
    gap: 10px;

    padding: 20px;
    border-radius: 8px;
    animation: ${fadeIn} 0.3s ease; /* Apply animation to modal content */
    @media (max-width: 768px) {
    }
`

export const Overlay = styled.div`
    ${overlayStyles}
`

export const ModalContent = styled.div`
    ${modalStyles}
    background-color: #010101;
`

export function formatDate(date: string): string {
    const dateObject: Date = new Date(date)
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    const formattedDate: string = dateObject.toLocaleDateString(
        'en-US',
        options
    )

    return formattedDate
}

export const StyledSpan = styled.span`
    font-weight: bold;
`
