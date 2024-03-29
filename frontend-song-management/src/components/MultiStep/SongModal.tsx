import React, { useState, useEffect, useRef, FormEvent } from 'react'
import styled from 'styled-components'
import { RootState } from '../../state/store'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { Flex, Box, Text } from 'rebass'
import MultiStepProgressBar from './MultiStepProgressBar'

const ModalBackgrounds = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(
        31,
        111,
        208,
        0.1
    ); // Use rgba to make the color semi-transparent
    backdrop-filter: blur(10px);
    display: flex;
    justify-content: center;
    align-items: center;
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
    color: #000; /* Black text color */
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
    color: black;

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
    'Jazz',
    'Electronic',
    'Rock',
    'Pop',
    'Hip-Hop',
    'Rap',
    'Classical',
    'Ethiopian Music',
    'other',
]
const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
`

const FileName = styled.span`
    color: #fff;
    margin-left: 10px;
`

const StyledInput = styled.input`
    padding: 10px;
    /* Add playful spirit: */
    color: #000;
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
const SongModal = ({
    isOpen,
    onClose,
}: {
    isOpen: boolean
    onClose: () => void
}) => {
      const showCreateSongSuccessToast = useSelector(
          (state: RootState) => state.songs.showCreateSongSuccessToast
      )
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
    const newSongIds = useSelector((state: RootState) => state.songs.newSongIds)

    const [file, setFile] = useState<File | null>(null)
    const [showErrorMessage, setShowErrorMessage] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
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
        genre: 'other',
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

        const response = await dispatch({
            type: 'song/createSong',
            payload: { data: formData },
        })

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
                payload: { id: newSongIds, file: formData.postImage },
            })
        }
        console.log(newSongIds)
        if (createSongCauseAnError === false && buttonIsLoading === false) {
            navigate('/')
            onClose()
            setPage('pageone')
            setFormData(initialFormData)
            console.log(newSongIds)
            dispatch({ type: 'song/resetNewSongId' })
            dispatch({ type: 'songs/fetchSongs' })
        } else {
            // dispatch({ type: 'song/createSong', payload: { data: formData } })
            onClose()
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
            setPage('pageone')
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
        <ModalBackgrounds>
            {showCreateSongSuccessToast && (
                <SuccessToast
                    isToastVisible={showCreateSongSuccessToast}
                    toastMessage="Song created successfully."
                />
            )}
            <ModalContent ref={modalRef}>
                <MultiStepProgressBar
                    page={page}
                    onPageNumberClick={nextPageNumber}
                />
                {
                    {
                        pageone: (
                            <>
                                <h2 style={{ color: '#fff' }}>Add Song</h2>

                                <form onSubmit={handleSubmitPageOne}>
                                    <FormLabel>Title:</FormLabel>
                                    <InputField
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <FormLabel>Artist:</FormLabel>
                                    <InputField
                                        type="text"
                                        name="artist"
                                        value={formData.artist}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <FormLabel>Album:</FormLabel>
                                    <InputField
                                        type="text"
                                        name="album"
                                        value={formData.album}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <FormLabel>Genre:</FormLabel>
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
                            </>
                        ),
                        pagetwo: (
                            <>
                                <h2 style={{ color: '#fff' }}>Add Song</h2>
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
                            </>
                        ),
                    }[page]
                }
            </ModalContent>
        </ModalBackgrounds>
    ) : null
}

export default SongModal
