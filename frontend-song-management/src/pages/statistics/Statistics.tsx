import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../state/store'
import styled from 'styled-components'
import { Box, Flex, Text } from 'rebass'

const Dropdown = styled.select`
    width: 200px;
    height: 30px;
    margin-bottom: 20px;
`
const StatsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    animation: fadeIn 1s;

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`

const StyledSelect = styled.select`
    padding: 10px;
    background-color: #1f6fd0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    outline: none;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;

    &:focus {
        box-shadow: 0 0 10px rgba(0, 0, 255, 0.2);
        transform: scale(1.02);
    }

    &:hover {
        transform: scale(1.02);
        box-shadow: 0 0 10px rgba(0, 0, 255, 0.2);
    }

    option {
        padding: 10px;
        background-color: #1f6fd0;
        color: #000;
        border-radius: 4px;
    }
`
const Statistics = () => {
    const dispatch = useDispatch()
    const stats = useSelector((state: RootState) => state.stats)
    console.log(stats)

    const [selectedGenre, setSelectedGenre] = useState(
        stats?.genreCounts[0]._id
    )
    const [selectedArtist, setSelectedArtist] = useState(
        stats.artistSongCounts[0]._id
    )
    const [selectedAlbum, setSelectedAlbum] = useState(
        stats.albumSongCounts[0]._id
    )
    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(event.target.value)
    }

    const handleArtistChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setSelectedArtist(event.target.value)
    }

    const handleAlbumChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedAlbum(event.target.value)
    }
    return (
        <div>
            <h1>Statistics</h1>
            <StatsContainer>
                <div>Total Songs: {stats.totalSongs}</div>
                <div>Total Artists: {stats.totalArtists}</div>
                <div>Total Albums: {stats.totalAlbums}</div>
                <div>Total Genres: {stats.totalGenres}</div>
            </StatsContainer>

            <Flex
                flexDirection={'row'}
                justifyContent={'space-around'}
                css={`
                    gap: 10px;
                    margin-top: 20px;
                    margin-bottom: 200px;
                `}
            >
                <Box>
                    <StyledSelect onChange={handleGenreChange}>
                        {stats.genreCounts.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item._id}
                            </option>
                        ))}
                    </StyledSelect>
                    <div>
                        Songs in selected genre:{' '}
                        {
                            stats.genreCounts.find(
                                (item) => item._id === selectedGenre
                            )?.count
                        }
                    </div>
                </Box>
                <Box>
                    <StyledSelect onChange={handleArtistChange}>
                        {stats.artistSongCounts.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item._id}
                            </option>
                        ))}
                    </StyledSelect>
                    <div>
                        Songs by selected artist:{' '}
                        {
                            stats.artistSongCounts.find(
                                (item) => item._id === selectedArtist
                            )?.count
                        }
                    </div>
                </Box>
                <Box>
                    <StyledSelect onChange={handleAlbumChange}>
                        {stats.albumSongCounts.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item._id}
                            </option>
                        ))}
                    </StyledSelect>
                    <div>
                        Songs in selected album:{' '}
                        {
                            stats.albumSongCounts.find(
                                (item) => item._id === selectedAlbum
                            )?.count
                        }
                    </div>
                </Box>
            </Flex>
            <Flex
                flexDirection={'row'}
                justifyContent={'space-around'}
                alignItems={'center'}
                css={`
                    gap: 10px;
                    margin-top: 0px;
                `}
            >
                <Box>
                    {stats.albumCountsPerArtist.map((item) => (
                        <div key={item._id}>
                            Artist: {item.artist}, Number of Albums:{' '}
                            {item.numberOfAlbums}
                        </div>
                    ))}
                </Box>
            </Flex>
        </div>
    )
}

export default Statistics
