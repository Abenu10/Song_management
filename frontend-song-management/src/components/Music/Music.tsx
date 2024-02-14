import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { FaPlay } from "react-icons/fa";
import { FaPause } from "react-icons/fa6"
import { Box, Flex, Text } from "rebass";

import { setCurrentSong } from '../../state/player/PlayerSlice';

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
} from "./Music.style";


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import SuccessToast from "../Toasts/SuccessToast";
import FailedToast from "../Toasts/FailedToast";


type myComponentProp = {
  album: string;
  artist: string;
  genre?: string;
  imageUrl?: string;
  songUrl?: string;
  date: string;
  title: string;
  _id?: string;
  userId?: string;
  likes?: number;
};

const Music: React.FC<myComponentProp> = ({
  album,
  artist,
  genre,
  imageUrl,
  songUrl,
  date,
  title,
  _id,
  userId,
  likes,
})  => {
  const dispatch = useDispatch();

  const handlePlaySong = () => {
    dispatch(setCurrentSong(song.songUrl));
  };
  const [optionIsOpened, setOptionIsOpened] = useState(false);
  const [markedItem, setMarkedItem] = useState(false)
  const [openDeleteModal ,setOpenDeleteModal] = useState(false);

  const showSuccessToast = useSelector((state: RootState) => state.songs.showSuccessToast)
  const showFailedToast = useSelector((state: RootState) => state.songs.showFailedToast)
  
  
  // to open option
  const handleOptionClick = (e: any) => {
    e.stopPropagation()
    setOptionIsOpened((prev) => !prev);
  };
  const dispatch = useDispatch()

  const deleteSong = (id: string | unknown) => {
    dispatch({ type: "song/deleteSongById", payload: { songid: id } });
    closeModal()
  };

  const openModal = () => {
    setOpenDeleteModal(true)
    setOptionIsOpened(false);
    setMarkedItem(true)
    // dispatch(setOpenDeleteModal(true))
    // dispatch(setmarkDeletedItem(true))
  };

  const closeModal = () => {
    setMarkedItem(false)
    setOpenDeleteModal(false)
    // dispatch(setOpenDeleteModal(false))
    // dispatch(setmarkDeletedItem(false))
    console.log('close')
  };
  console.log(markedItem);


  const StyledContent = styled.div`
  z-index: 10;
  font-size: 17px;
  position: absolute;
  min-width: 100px;
  background-color: #d0e3f0;
  box-shadow: 2px 2px 5px rgba(0, 0, 255, 0.1);
  border-radius: 10px;
  margin-right: 5px;
  display: ${optionIsOpened ? "block" : "none"};

  text-decoration: none;
  right: 0;
`;
const spotifyStyle = css`
  color: #1f3044;
  padding: 4px 4px;
  border-radius: 8px;
  background-color: ${optionIsOpened ? "#a8bcc3" : ""};
  background-color: ${markedItem ? "#a8bcc3" : ""};
  max-width: 800px;
  &:hover {
      background-color: #a8bcc3;
  }
  transition: all 0.5s ease;
`;
const StyledBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: ${optionIsOpened ? "block" : "none"};
  height: 100vh;
  width: 100%;
`;
  return (
    <div onClick={handlePlaySong}>
    
    <SuccessToast isToastVisible={showSuccessToast} />
    <FailedToast isToastVisible={showFailedToast} />
      
    {/* Render modal if isOpen is true */}
    {openDeleteModal && (
          <Overlay onClick={closeModal}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <Text fontSize={4} fontWeight={"bold"}>
                Delete from your Songs?
              </Text>
              <Text>This will delete <StyledSpan>{title}</StyledSpan> from Your Songs.</Text>
              <Flex
                flexDirection={"row"}
                justifyContent={"flex-end"}
                css={`
                  gap: 10px;
                  margin-top: 20px;
                `}
              >
                <Button2 onClick={closeModal}>Cancel</Button2>
                <Button onClick={() => deleteSong(_id)}>Delete</Button>
              </Flex>
            </ModalContent>
          </Overlay>
        )}
      <StyledBackGround onClick={handleOptionClick}></StyledBackGround>
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        css={spotifyStyle.styles}
      >
        <Flex
          flexDirection={"row"}
          alignItems={"center"}
          flex={1.5}
          css={playTitle.styles}
        >
          <Box ml={2}>{true ? <FaPlay /> : <FaPause />}</Box>
          <Box>
            <img
              style={{ width: "45px", height: "45px", borderRadius: "5px" }}
              src={
                "https://th.bing.com/th/id/OIP.keIG-gLYH4XdTkLvAFqI2QHaEo?rs=1&pid=ImgDetMain"
              }
            />
          </Box>
          <Flex
            flexDirection={"column"}
            justifyContent={"space-between"}
            css={titleStyle.styles}
          >
            <Box>
              <Text fontSize={16} fontWeight="bold">
                {title}
              </Text>
            </Box>
            <Box>
              <Text fontSize={14}>{artist}</Text>
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
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {album}
          </Text>
        </Box>
        <Box css={[boxStyle.styles, hiddenOnSmallScreen.styles]} flex={1}>
          <Text fontSize={14}>{formatDate(date)}</Text>
        </Box>
        <Box css={StyledOptionContainer.styles} >
          <StyledOption onClick={handleOptionClick} />
          {optionIsOpened === true ? (
            <StyledContent onClick={(e) => e.stopPropagation()}>
              <Link
                to={`/editSong/${_id}`}
                style={{ textDecoration: "none", color: "#1f3044" }}
              >
                <Flex
                  flexDirection={"row"}
                  alignItems={"center"}
                  p={2}
                  css={StyledlementsMenuebarContent.styles}
                >
                  <Box>
                    <EditIcon />
                  </Box>

                  <Box>
                    <StyledButton>Edit</StyledButton>
                  </Box>
                </Flex>
              </Link>
              <Flex
                flexDirection={"row"}
                alignItems={"center"}
                p={2}
                css={StyledlementsMenuebarContent.styles}
                onClick={(e) => openModal(e)}
              >
                <Box>
                  <StyledRemoveIcon />
                </Box>
                <Box>
                  <StyledButton>Remove</StyledButton>
                </Box>
              </Flex>
            </StyledContent>
          ): ""}
        </Box>
      </Flex>
    </div>
  );
};

export default Music;
