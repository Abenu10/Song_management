import React, { useEffect, useState } from "react";
import { FormEvent } from "react";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import ErrorMessage from "../components/ErrorMessage";

const StyledInput = styled.input`
  padding: 10px;
  /* Add playful spirit: */
  background-color: #f0f8ff;
  border: 1px solid #c0c0ff;
  
  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 8px; /* Rounded corners */
  
  
  &:focus {
    box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
    border-color: #9090ff;
  }
`;
const Categories = [
  "R&B",
  "Electronic",
  "Rock",
  "Rap",
  "country/Ethiopia",
  "Pop",
  "Hip",
];

const StyledSelect = styled.select`
  padding: 10px;
  /* Add playful spirit: */
  background-color: #f0f8ff;
  border: 1px solid #c0c0ff;

  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 8px; /* Rounded corners */

  /* Playful font */
  font-size: 18px;

  /* Playful animations on focus */
  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 0, 255, 0.2);
  }
`;
const StyledOption = styled.option`
     
      color: #333;
      padding: 10px;
      border-radius: 5px;
  
      &:hover {
        background: red;
      }
    }
  `;

const StyledButton = styled.button`
  padding: 10px;
  /* Add playful spirit: */
  color: #E1F2F7;
  background-color: #bd1e51;
  border: 1px solid #c0c0ff;
  font-size: 16px;
  outline: none;
  box-shadow: 0 0 2px rgba(0, 0, 255, 0.1);
  transition: 0.2s ease-in-out;
  border-radius: 8px; /* Rounded corners */
  cursor: pointer; /* Ensure cursor changes on hover */

  &:hover {
    background-color: #980030;
  }

  &:focus {
    box-shadow: 0 0 4px rgba(0, 0, 255, 0.2);
    border-color: #9090ff;
  }

  transition: 0.4s;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const StyledForm = styled.form``;
interface InputChangeEvent {
  target: {
    name: string;
    value: string;
  };
}
interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  coverImageUrl: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

function EditSongPage() {
  const { id } = useParams();
  
  const navigate = useNavigate();

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const isLoading = useSelector(
    (state: RootState) => state.songs.searchedSongLoading
  );
  const searchedSong = useSelector(
    (state: RootState) => state.songs.searchedSong
  );
  const EditSongCauseAnError = useSelector(
    (state: RootState) => state.songs.isEditSongCausingError
  );
  const buttonIsLoading = useSelector(
    (state: RootState) => state.songs.EditSongButtonLoading
  );
  console.log(searchedSong);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    songid: id,
    title: "",
    artist: "",
    album: "",
    genre: "",
    coverImageUrl: "",
  });

  useEffect(() => {
    dispatch({ type: "song/getSongById", payload: { id: id } });
  }, [id]);
  useEffect(() => {
    setFormData({
      songid: id,
      title: searchedSong.title,
      artist: searchedSong.artist,
      album: searchedSong.album,
      genre: searchedSong.genre,
      coverImageUrl: searchedSong.coverImageUrl,
    });
  }, [searchedSong]);

  const genreStyles = css`
  gap: 12px;
  flex-wrap: wrap;
  width: 100%;

  @media screen and (min-width: 768px) {
    width: 450px; /* Adjust width for larger screens */
  }
  `;
  const spinnerStyles = css`
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top: 3px solid #007bff;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s linear infinite;
    margin-left: 10px;

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  `;
  function handleInputChange(e: InputChangeEvent) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleClick()
    dispatch({ type: "song/updateSong", payload: { data: formData } });

    if (EditSongCauseAnError === false && buttonIsLoading === false) {
      navigate("/");
    }
  }
  const handleClick = () => {
    // Simulate asynchronous operation
    setShowErrorMessage(true);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 8000);
  };

  return (
    <Flex flexDirection={"column"}>
      {EditSongCauseAnError && showErrorMessage && !buttonIsLoading ? (
        <ErrorMessage
          message="Error while editing the song. Please try again."
          show={setShowErrorMessage}
        />
      ) : (
        ""
      )}
      <Box>
        <Text fontSize={5} fontWeight="bold" mb={2}>
          Edit Song
        </Text>
      </Box>
      
      {isLoading ? (
        "Loading"
      ) : (
        <StyledForm onSubmit={handleSubmit}>
          <Flex flexDirection={"column"} css={genreStyles.styles}>
            <Text fontSize={2} fontWeight="bold" mb={0}>
              Song Title
            </Text>
            <StyledInput
              required
              type="text"
              placeholder="Song Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <Text fontSize={2} fontWeight="bold" mb={0}>
              Artist Name
            </Text>
            <StyledInput
              required
              type="text"
              placeholder="Artist Name"
              name="artist"
              value={formData.artist}
              onChange={handleInputChange}
            />
            <Text fontSize={2} fontWeight="bold" mb={0}>
              Album Name
            </Text>
            <StyledInput
              required
              type="text"
              placeholder="Album Name"
              name="album"
              value={formData.album}
              onChange={handleInputChange}
            />
            <Text fontSize={2} fontWeight="bold" mb={0}>
              Song Cover Image Url
            </Text>
            <StyledInput
              required
              type="text"
              placeholder="Song Cover Image URL"
              name="coverImageUrl"
              value={formData.coverImageUrl}
              onChange={handleInputChange}
            />
            <Text fontSize={2} fontWeight="bold" mb={0}>
              Select Song Genre
            </Text>
            <StyledSelect
              required
              name="genre"
              onChange={handleInputChange}
              value={formData.genre}
            >
              {Categories.map((category, index) => (
                <StyledOption key={index} value={category}>
                  {category}
                </StyledOption>
              ))}
            </StyledSelect>
            <StyledButton type="submit" disabled={buttonIsLoading}>
            {buttonIsLoading ? (
              <>
                <Flex
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  css={`
                    height: 30px;
                  `}
                >
                  <Text>Edit Song</Text>
                  <Flex css={spinnerStyles.styles}></Flex>
                </Flex>
              </>
            ) : (
              <Flex
                flexDirection={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                css={`
                  height: 30px;
                `}
              >
                <Text>Edit Song</Text>
              </Flex>
            )}
          </StyledButton>
          </Flex>
        </StyledForm>
      )}
    </Flex>
  );
}

export default EditSongPage;
