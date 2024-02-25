import { useState, useEffect } from 'react'
import { IoIosAddCircleOutline } from 'react-icons/io'
// Styled component should be defined outside of the component function
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex, Box, Text } from 'rebass'

import { Link, useLocation } from 'react-router-dom'
//

export default function SideBar() {
    const location = useLocation()
    const sideBarStyle = css`
        height: 100vh;
        position: sticky;
        top: 0;

        width: 350px;

        //  background: #a8bcc3;
        background: #010409;
        transition: all 0.5s ease;
        font-weight: bolder;

        @media (max-width: 768px) {
            display: none;
        }
    `
    const sideBarElement = css`
        font-size: 20px;
        color: #1f3044;
        padding: 7px;
        margin: 5px 0px;
        cursor: pointer;
        border-radius: 10px;
        position: relative;

        &:hover {
            /* color: #bd1e51; */
            --icon-color: #1f6fd0;

            &::after {
                content: '';
                position: absolute; // Change this to absolute
                top: 0;
                left: 0; // Start from the edge of the Flex component
                width: 23%; // Adjust this to control how far the beam reaches
                height: 100%;
                background: linear-gradient(
                    to right,

                    rgb(31, 111, 208, 0.5),
                    transparent
                );
                z-index: -1;
                transition: width 0.4s, background 0.4s;
            }
        }

        &::after {
            content: '';
            position: absolute; // Change this to absolute
            top: 0;
            left: 0;
            width: 0; // This is the thin line
            height: 100%;
            background: rgb(31, 111, 208, 0.1);
            z-index: -1;
            transition: width 0.4s, background 0.4s;
        }

        transition: 0.4s;
    `

    const header = css`
        font-size: 28px;
        color: #1f6fd0;
        text-align: center;
    `
    const menu = css`
        margin-top: 25px;
        padding: 0px 10px;
    `
    return (
        <>
            <Flex flexDirection={'column'} css={sideBarStyle}>
                <Flex
                    flexDirection={'row'}
                    justifyContent="space-between"
                    alignItems="center"
                    css={menu}
                >
                    <Box ml={40}>
                        <Text
                            css={{
                                ...header,
                                color: '#1f6fd0',
                                fontSize: '20px',
                            }}
                            mt={20}
                        >
                            Muzikabet
                        </Text>
                    </Box>
                </Flex>
                <Link to={'/'}>
                    <Flex
                        flexDirection={'row'}
                        alignItems="center"
                        css={sideBarElement}
                        style={{
                            color: location.pathname === '/' ? '#BD1E51' : '',
                            marginTop: '50px',
                            marginLeft: '0',
                            paddingLeft: '40px',
                        }}
                        ml={40}
                    >
                        <Box mr={20}>
                            {' '}
                            {/* This will add margin to the right of the icon */}
                            <svg
                                stroke="currentColor"
                                fill="var(--icon-color, currentColor)"
                                stroke-width="0"
                                viewBox="0 0 1024 1024"
                                height="1.3em"
                                width="1.3em"
                                margin-right="90px"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z"></path>
                            </svg>
                        </Box>
                        <Box mr={20}>
                            <Text>Home</Text>
                        </Box>
                    </Flex>
                </Link>
                <Link to={'/playlist'}>
                    <Flex
                        flexDirection={'row'}
                        alignItems="center"
                        css={sideBarElement}
                        style={{
                            color:
                                location.pathname === '/genre' ? '#BD1E51' : '',
                            marginLeft: '0',
                            paddingLeft: '40px',
                        }}
                        ml={40}
                    >
                        <Box mr={20}>
                            <svg
                                stroke="currentColor"
                                fill="var(--icon-color, currentColor)"
                                stroke-width="0"
                                viewBox="0 0 24 24"
                                height="1.3em"
                                width="1.3em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M2 18h10v2H2v-2zm0-7h14v2H2v-2zm0-7h20v2H2V4zm17 11.17V9h5v2h-3v7a3 3 0 1 1-2-2.83zM18 19a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"></path>
                                </g>
                            </svg>
                        </Box>
                        <Box>
                            <Text>Playlist</Text>
                        </Box>
                    </Flex>
                </Link>
                <Link to={'/Statistics'}>
                    <Flex
                        flexDirection={'row'}
                        alignItems="center"
                        css={sideBarElement}
                        style={{
                            color:
                                location.pathname === '/Statistics'
                                    ? '#BD1E51'
                                    : '',
                            marginLeft: '0',
                            paddingLeft: '40px',
                        }}
                        ml={40}
                    >
                        <Box mr={20}>
                            <svg
                                stroke="currentColor"
                                fill="var(--icon-color, currentColor)"
                                stroke-width="0"
                                viewBox="0 0 16 16"
                                height="1.3em"
                                width="1.3em"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5h-2v12h2V2zm-2-1a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V2a1 1 0 00-1-1h-2zM6 7a1 1 0 011-1h2a1 1 0 011 1v7a1 1 0 01-1 1H7a1 1 0 01-1-1V7zm-5 4a1 1 0 011-1h2a1 1 0 011 1v3a1 1 0 01-1 1H2a1 1 0 01-1-1v-3z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </Box>
                        <Box>
                            <Text>Statistics</Text>
                        </Box>
                    </Flex>
                </Link>
            </Flex>
        </>
    )
}
