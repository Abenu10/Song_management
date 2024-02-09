// Define the User type
interface User {
    name: string
    email: string
    password: string
    avatar: string
    date: Date
    profile: string
}

// Define the Song type
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
// Define the Playlist type
interface Playlist {
    title: string
    description: string
    songs: Song[]
    user: User
}

// Export the types
export type { User, Song, Playlist }
