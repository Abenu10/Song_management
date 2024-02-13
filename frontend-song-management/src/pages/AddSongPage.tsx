import React, { useEffect, useState } from 'react'
import { FormEvent } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Flex, Box, Text } from 'rebass'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../state/store'
import { useNavigate } from 'react-router'
import ErrorMessage from '../components/ErrorMessage'
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
`
const Categories = [
    'R&B',
    'Electronic',
    'Rock',
    'Rap',
    'country/Ethiopia',
    'Pop',
    'Hip',
]

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
`
const StyledOption = styled.option`
     
      color: #333;
      padding: 10px;
      border-radius: 5px;
  
      &:hover {
        background: red;
      }
    }
  `

const StyledButton = styled.button`
    padding: 10px;
    /* Add playful spirit: */
    color: #e1f2f7;
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
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
`
const StyledForm = styled.form``
interface InputChangeEvent {
    target: {
        name: string
        value: string
    }
}

function AddSongPage() {
    const [loading, setLoading] = useState(false)
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
        coverImageUrl: '',
        audio: '',
    })
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    console.log(formData)

    const genreStyles = css`
        gap: 12px;
        flex-wrap: wrap;
        width: 100%;

        @media screen and (min-width: 768px) {
            width: 450px; /* Adjust width for larger screens */
        }
    `
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
    `
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
        dispatch({ type: 'song/createSong', payload: { data: formData } })

        if (createSongCauseAnError === false && buttonIsLoading === false) {
            navigate('/')
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
                        type="text"
                        placeholder="Song Cover Image URL"
                        name="coverImageUrl"
                        value={formData.coverImageUrl}
                        onChange={handleInputChange}
                    />
                    <StyledInput
                        required
                        type="file"
                        placeholder="audio"
                        name="audio"
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

export default AddSongPage
