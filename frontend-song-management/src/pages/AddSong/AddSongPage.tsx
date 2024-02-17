import React, { useEffect, useState } from 'react'
import { FormEvent } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../state/store'
import { useNavigate } from 'react-router'
import ErrorMessage from '../../components/ErrorMessage'

import { Flex, Box, Text } from 'rebass'

import {
    StyledInput,
    Categories,
    StyledSelect,
    StyledOption,
    StyledButton,
    StyledForm,
    genreStyles,
    spinnerStyles,
} from './AddSong.style';

function AddSongPage() {
    const [file, setFile] = useState<File | null>(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const createSongCauseAnError = useSelector(
        (state: RootState) => state.songs.isCreateSongCausingError
    )
    const buttonIsLoading = useSelector(
        (state: RootState) => state.songs.addSongButtonLoading
    )
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        album: '',
        genre: '',
        postAudio: '',
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    console.log(formData)

    
    function handleInputChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const target = e.target as HTMLInputElement
        const { name, value } = target

        if (target.type === 'file') {
            setFormData({
                ...formData,
                [name]: target.files ? target.files[0] : null,
            })
            setFile(target.files ? target.files[0] : null);
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }
    
    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleClick()

        if (createSongCauseAnError === false && buttonIsLoading === false) {
            await dispatch({ type: 'song/createSong', payload: { data: formData } })
            navigate('/')
        } else {
            // dispatch({ type: 'song/createSong', payload: { data: formData } })
        }
    }
    const handleClick = () => {
        // Simulate asynchronous operation
        setShowErrorMessage(true)
        setTimeout(() => {
            setShowErrorMessage(false)
        }, 8000)
    }

    return (
        <Flex flexDirection={'column'}>
            {createSongCauseAnError && showErrorMessage && !buttonIsLoading ? (
                <ErrorMessage
                    message="Error while adding the song. Please try again."
                    show={setShowErrorMessage}
                />
            ) : (
                ''
            )}

            <Box>
                <Text fontSize={5} fontWeight="bold" mb={2}>
                    Add Song
                </Text>
            </Box>
            <StyledForm onSubmit={handleSubmit}>
                <Flex flexDirection={'column'} css={genreStyles.styles}>
                    <StyledInput
                        required
                        type="text"
                        placeholder="Song Title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                    />
                    <StyledInput
                        required
                        type="text"
                        placeholder="Artist Name"
                        name="artist"
                        value={formData.artist}
                        onChange={handleInputChange}
                    />
                    <StyledInput
                        required
                        type="text"
                        placeholder="Album Name"
                        name="album"
                        value={formData.album}
                        onChange={handleInputChange}
                    />
                    <StyledInput
                        required
                        type="file"
                        placeholder="audio file"
                        name="postAudio"
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
                                    flexDirection={'row'}
                                    alignItems={'center'}
                                    justifyContent={'center'}
                                    css={`
                                        height: 30px;
                                    `}
                                >
                                    <Text>Add Song</Text>
                                    <Flex css={spinnerStyles.styles}></Flex>
                                </Flex>
                            </>
                        ) : (
                            <Flex
                                flexDirection={'row'}
                                alignItems={'center'}
                                justifyContent={'center'}
                                css={`
                                    height: 30px;
                                `}
                            >
                                <Text>Add Song</Text>
                            </Flex>
                        )}
                    </StyledButton>
                </Flex>
            </StyledForm>
        </Flex>
    )
}


export default AddSongPage;
