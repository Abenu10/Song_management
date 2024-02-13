import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";

import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";

import NavBar from "../components/NavBar";


export default function Main() {
  const MainStyle = css`
    padding: 0px 15px;
    @media screen and (min-width: 768px) {
      gap: 15px; /* Adjust width for larger screens */
      padding: 0px;
      padding-right: 15px;
    }
  `;
  const contentStyle = css`
    color: black;
    height: 100vh;

    border-radius: 10px;
  `;

  return (
    <>
      
      <Flex css={MainStyle.styles} alignItems={""}>
        <Box>
          <SideBar />
        </Box>
        <Box flex={2}>
          <NavBar />

          <Outlet />
        </Box>
      </Flex>
    </>
  );
}
