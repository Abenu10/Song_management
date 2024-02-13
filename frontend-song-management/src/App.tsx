import { Routes, Route, Router } from "react-router-dom";

import Main from "./layout/Main";
import Home from "./pages/Home";
import GenrePage from "./pages/GenrePage";
import StatisticsPage from "./pages/StatisticsPage";
import FilteredSongsPage from "./pages/FilteredSongsPage";
import AddSongPage from "./pages/AddSongPage";
import EditSongPage from "./pages/EditSongPage";
import {RootState} from './state/store';
import {getSongs} from './state/songs/songsSlice';
// 

import { useState, useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { IoStatsChart } from "react-icons/io5";
import { TbMenu2 } from "react-icons/tb";
import { IoIosClose } from "react-icons/io";
// Styled component should be defined outside of the component function
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import { useDispatch, useSelector } from "react-redux";




const StyledIcon = styled(IoMdHome)`
  margin-right: 10px;
  font-size: 30px;
`;
const StyledIcon2 = styled(BiCategory)`
  margin-right: 10px;
  font-size: 30px;
`;
const StyledIcon3 = styled(IoStatsChart)`
  margin-right: 10px;
  font-size: 30px;
`;
const MenuIcon = styled(TbMenu2)`
  position: absolute;
  cursor: pointer;
  left: 40px;
  top: 25px;
  font-size: 35px;
`;
const CloseIcon = styled(IoIosClose)`
  font-size: 40px;
  cursor: pointer;
  transition: all 0.5s ease;
`;

function App() {
  const [openSidebar, setOpenSidebar] = useState(false);

  // const data = useSelector((state : RootState) => state.songs.songs)
  // const dispach = useDispatch()
  // useEffect(() => {
  //   dispach({ type: "songs/fetchSongs"})
  // }, [])
  // console.log(data)

  const sideBarStyle = css`
    position: fixed;
    top: 0;
    left: ${openSidebar ? "-350px" : "0px"};
    width: 350px;
    height: 100%;
    background: #1d2228;
    transition: all 0.5s ease;
    font-weight: bolder;
  `;
  const sideBarElement = css`
    font-size: 20px;
    color: #e1e2e2;

    padding: 7px;
    margin: 5px 16px;
    box-sizing: border-box;
    cursor: pointer;
    border-radius: 10px;
    &:hover {
      color: #fb8122;
    }
    transition: 0.4s;
  `;

  const header = css`
    font-size: 22px;
    color: #e1e2e2;
    text-align: center;
  `;
  const menu = css`
    margin-top: 25px;
    padding: 0px 10px;
  `;
  function openMySidebar() {
    setOpenSidebar((prev) => !prev);
  }
  function closeMySidebar() {
    setOpenSidebar((prev) => !prev);
  }
  const hiddenOnMediumScreen = css`
    @media (max-width: 768px) {
      display: none;
    }
  `;
  useEffect(() => {
    const handleResize = () => {
      // Check the screen width and update the state accordingly
      if (window.innerWidth <= 992) {
        setOpenSidebar(true);
      } else {
        setOpenSidebar(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Initial check for screen width when component mounts
    handleResize();

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {/* {<MenuIcon onClick={openMySidebar}/>}
      <Flex flexDirection={"column"}  css={sideBarStyle}>
        <Flex flexDirection={"row"} justifyContent="space-between" alignItems="center" css={menu}>
          <Box><Text css={header}>My APP</Text></Box>
          <Box><CloseIcon onClick={openMySidebar}/></Box>
        </Flex>
        
        <Flex flexDirection={"row"} alignItems="center" css={sideBarElement}>
            <Box><StyledIcon /></Box>
            <Box>
              <Text>Home</Text>
            </Box>
          </Flex>
        
        <Flex flexDirection={"row"} alignItems="center" css={sideBarElement}>
            <Box><StyledIcon2 /></Box>
            <Box>
              <Text>Genre</Text>
            </Box>
          </Flex>
          <Flex flexDirection={"row"} alignItems="center" css={sideBarElement}>
            <Box><StyledIcon3 /></Box>
            <Box>
              <Text>Statistics</Text>
            </Box>
          </Flex>
        
      </Flex>
      <Flex flexDirection={"row"} justifyContent="space-between" alignItems="center">
        <Box>
          <input type="search" />
        </Box>
      </Flex>
    </> */}
      {/* <SideBar /> */}
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/genre" element={<GenrePage />} />
          <Route path="/genre/:genre" element={<FilteredSongsPage />} />
          <Route path="/Statistics" element={<StatisticsPage />} />
          <Route path="/addSong" element={<AddSongPage />} />
          <Route path="/editSong/:id" element={<EditSongPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
