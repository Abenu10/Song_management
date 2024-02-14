import { useEffect } from "react";
import { Flex, Box, Text } from "rebass";
import Music from "../components/Music/Music";
import { css } from "@emotion/react";
//
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { Key } from "@mui/icons-material";
//

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


function Home() {
  const data = useSelector((state: RootState) => state.songs.songs);

  const isLoading = useSelector(
    (state: RootState) => state.songs.getSongsLoading
  );
  const dispatch = useDispatch();
  const HomeStyle = css`
    width: 100%;
  `;

  useEffect(() => {
    dispatch({ type: "songs/fetchSongs" });
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  console.log(data);

  return (
    <>
      <Flex flexDirection={"column"} css={HomeStyle.styles}>
        <Box>
          <Text fontSize={5} fontWeight="bold">
            All Songs
          </Text>
        </Box>
        <Box>
          {isLoading
            ? "Loading"
            : data.map((song: Song) => {
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
            })
              }
        </Box>
      </Flex>
    </>
  );
}

export default Home;
