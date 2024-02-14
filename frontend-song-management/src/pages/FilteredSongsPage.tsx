import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { Flex, Box, Text } from "rebass";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { useEffect } from "react";
import { useParams } from "react-router";
import Music from "../components/Music/Music";
import Player from "@/components/Player/Player";

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  songUrl: string; 
  publicId?: string; 
  userId: string; 
  likes: string[]; 
  __v?:Number;
}

function FilteredSongsPage() {
  const { genre } = useParams();
  const data = useSelector((state: RootState) => state.songs.songsByGenre);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "songsByGenre/fetchSongs", payload: { genre: genre } });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(data);

  return (
    <>
    <Player />
    <Flex flexDirection={"column"}>
      <Box>
        <Text fontSize={6} fontWeight="bold" mb={2}>
          {genre}
        </Text>
      </Box>
      <Box>
      
        {data.map((song: Song) => {
          return (
            <Music
                  key={song._id}
                  artist={song.artist}
                  title={song.title}
                  album={song.album}
                  genre={song.genre}
                  songUrl={song.songUrl}
                  // Add this line
                  userId={song.userId} // Add this line
                  likes={song.likes} // Add this line
                  _id={song._id}
                  />
                  );
                })}
      </Box>
    </Flex>
                </>
  );
}

export default FilteredSongsPage;
