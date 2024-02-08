import React from 'react'


interface Song {
    _id: string
    title: string
    artist: string
    album: string
    genre: string
    songUrl: string
    publicId: string
    userId: string
    likes: string[]
}

interface SongListProps {
    songs: Song[]
    isLoading: boolean
    error: string | null
}

const SongList = ({ songs, isLoading, error }: SongListProps) => {
    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <div>
            <h2>Song List</h2>
            <ul>
                {songs.map((song) => (
                    <li key={song._id}>{song.title}</li>
                ))}
            </ul>
        </div>
       
    )
}

export default SongList
