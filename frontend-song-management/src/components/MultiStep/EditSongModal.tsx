import React, { useState, useEffect, useRef, FormEvent } from 'react'
import styled from 'styled-components'
import { RootState } from '../../state/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Flex, Box, Text } from 'rebass'
import MultiStepProgressBar from './MultiStepProgressBar'
import { fetchSongById } from '@/state/songs/songsSlice'
import axios from 'axios'
import { updateSong } from '../../state/songs/songsSlice'
const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 50, 0.5); /* Blue-black background color */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`

const ModalContent = styled.div`
    background-color: #000; /* Black background color */
    padding: 20px;
    border-radius: 10px;
    width: 80%; /* Adjusted width */
    max-width: 400px; /* Maximum width */
`

const FormLabel = styled.label`
    display: block;
    margin-bottom: 10px;
    color: #fff; /* White text color */
`

const InputField = styled.input`
    width: calc(100% - 16px); /* Adjusted width */
    padding: 8px;
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    color: black;
`
export const StyledSelect = styled.select`
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
const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`

const FileName = styled.span`
    color: #fff;
    margin-left: 10px;
`

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
interface EditSongModalProps {
    songId: string
    isOpen: boolean
    onClose: () => void
}

const EditSongModal: React.FC<EditSongModalProps> = ({
    songId,
    isOpen,
    onClose,
}) => {
    console.log('songId:', songId)
    const [song, setSong] = useState(null)
    useEffect(() => {
        const fetchSongById = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8800/api/songs/${songId._id}`
                )
                setSong(response.data)
                console.log(response.data)
            } catch (error) {
                console.error('Failed to fetch song:', error)
            }
        }

        if (isOpen) {
            fetchSongById()
        }
    }, [isOpen, songId])
    // if (!song) {
    //     return null // Or a loading spinner
    // }

    const dispatch = useDispatch()
    // const song = useSelector((state: RootState) => state.songs.byId[songId])
    // console.log(song)

    const [page, setPage] = useState('pageone')

    const nextPage = (page) => {
        setPage(page)
    }

    const nextPageNumber = (pageNumber) => {
        switch (pageNumber) {
            case '1':
                setPage('pageone')
                break
            case '2':
                setPage('pagetwo')
                break
            default:
                setPage('1')
        }
    }
    const newSongId = useSelector((state: RootState) => state.songs.newSongId)

    const [file, setFile] = useState<File | null>(null)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()
    const createSongCauseAnError = useSelector(
        (state: RootState) => state.songs.isCreateSongCausingError
    )
    const buttonIsLoading = useSelector(
        (state: RootState) => state.songs.addSongButtonLoading
    )
    const initialFormData = {
        title: '',
        artist: '',
        album: '',
        genre: '',
        postAudio: '',
        postImage: '',
    }
    const [formData, setFormData] = useState(initialFormData)

    // const [formData, setFormData] = useState({
    //     title: '',
    //     artist: '',
    //     album: '',
    //     genre: '',
    //     postAudio: '',
    //     postImage: '',
    // })
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
            setFile(target.files ? target.files[0] : null)
        } else {
            setFormData({
                ...formData,
                [name]: value,
            })
        }
    }

    async function handleSubmitPageOne(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        handleClick()

        // if (createSongCauseAnError === false && buttonIsLoading === false) {
        //     await dispatch({
        //         type: 'song/createSong',
        //         payload: { data: formData },
        //     })

        // } else {
        //     // dispatch({ type: 'song/createSong', payload: { data: formData } })
        // }
        // const response = await dispatch({
        //     type: 'song/createSong',
        //     payload: { data: formData },
        // })
        dispatch(updateSong({ id: songId._id, data: formData }))
        // setSongId(songId);
        setPage('pagetwo')
    }

    // function handleSubmitPageOne(e: FormEvent<HTMLFormElement>) {
    //     e.preventDefault()
    //     setPage('pagetwo')
    // }
    async function handleSubmitPageTwo(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (formData.postImage) {
            dispatch({
                type: 'song/updateSongCover',
                payload: { id: newSongId, file: formData.postImage },
            })
        }
        console.log(newSongId)
        if (createSongCauseAnError === false && buttonIsLoading === false) {
            navigate('/')
            onClose()
            setPage('pageone')
            setFormData(initialFormData)
            console.log(newSongId)
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

    const modalRef = useRef(null)

    const handleCloseModal = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose()
        }
    }

    useEffect(() => {
        const handleOutsideClick = (e: React.MouseEvent) => {
            handleCloseModal(e)
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleOutsideClick)
        } else {
            document.removeEventListener('mousedown', handleOutsideClick)
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick)
        }
    }, [isOpen, onClose])

    return isOpen ? (
        <ModalBackground onClick={onClose}>
            <ModalContent ref={modalRef} onClick={(e) => e.stopPropagation()}>
                <MultiStepProgressBar
                    page={page}
                    onPageNumberClick={nextPageNumber}
                />
                <h2 style={{ color: '#fff' }}>Edit Song</h2>

                {
                    {
                        pageone: (
                            <form onSubmit={handleSubmitPageOne}>
                                <FormLabel>Title:</FormLabel>
                                <InputField
                                    type="text"
                                    name="title"
                                    // value={formData.title}
                                    // onChange={handleInputChange}
                                    value={song?.title}
                                    onChange={(e) =>
                                        handleTitleChange(e, setSong)
                                    }
                                    required
                                />
                                <FormLabel>Artist:</FormLabel>
                                <InputField
                                    type="text"
                                    name="artist"
                                    // value={formData.artist}
                                    // onChange={handleInputChange}
                                    value={song?.artist}
                                    onChange={(e) =>
                                        handleArtistChange(e, setSong)
                                    }
                                    required
                                    // value={song.artist}
                                />
                                <FormLabel>Album:</FormLabel>
                                <InputField
                                    type="text"
                                    name="album"
                                    // value={formData.album}
                                    onChange={handleInputChange}
                                    required
                                    value={song?.album}
                                />
                                <FormLabel>Genre:</FormLabel>
                                <Text fontSize={2} fontWeight="bold" mb={0}>
                                    Select Song Genre
                                </Text>
                                <StyledSelect
                                    required
                                    name="genre"
                                    onChange={handleInputChange}
                                    // value={formData.genre}
                                    value={song?.genre}
                                >
                                    {Categories.map((category, index) => (
                                        <StyledOption
                                            key={index}
                                            value={category}
                                        >
                                            {category}
                                        </StyledOption>
                                    ))}
                                </StyledSelect>
                                {/* Input field for uploading music files */}
                                <FormLabel>Upload Music:</FormLabel>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    {/* <InputField
                            type="file"
                            name="musicFile"
                            accept="audio/*"
                            onChange={handleInputChange}
                            required
                        /> */}
                                    <StyledInput
                                        required
                                        type="file"
                                        placeholder="audio file"
                                        name="postAudio"
                                        onChange={handleInputChange}
                                    />
                                    {/* <FileName>
                            {formData.musicFile ? formData.musicFile.name : ''}
                        </FileName> */}
                                </div>
                                <Button type="submit">Next</Button>
                            </form>
                        ),
                        pagetwo: (
                            <form onSubmit={handleSubmitPageTwo}>
                                <FormLabel>Upload Image:</FormLabel>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <StyledInput
                                        required
                                        type="file"
                                        placeholder="image file"
                                        name="postImage"
                                        accept="image/*"
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <Button type="submit">Submit</Button>
                            </form>
                        ),
                    }[page]
                }
            </ModalContent>
        </ModalBackground>
    ) : null
}

function handleTitleChange(e, setSong) {
    setSong((prevSong) => ({ ...prevSong, title: e.target.value }))
}

function handleArtistChange(e, setSong) {
    setSong((prevSong) => ({ ...prevSong, artist: e.target.value }))
}

export default EditSongModal
