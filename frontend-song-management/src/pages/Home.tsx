import { useEffect } from "react";
import { Flex, Box, Text } from "rebass";
import Music from "../components/Music";
import { css } from "@emotion/react";
//
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
//
interface Song {
  album: string;
  artist: string;
  coverImageUrl: string;
  createdAt: string;
  genre: string;
  title: string;
  updatedAt: string;
  _id: string;
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
            : data.map((song: Song) => (
                <Music
                  key={song._id} // Remember to provide a unique key prop when rendering a list of components
                  artist={song.artist}
                  title={song.title}
                  album={song.album}
                  date={song.updatedAt}
                  _id={song._id}
                />
              ))}
        </Box>
      </Flex>
    </>
  );
}

export default Home;
