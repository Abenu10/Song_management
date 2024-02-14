// https://github.com/lhz516/react-h5-audio-player#readme
// https://www.bensound.com/

import { useState, useEffect } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface PlayerProps {
    songs: Song[];
}

interface Song {
    _id: string;
    artist: string;
    title: string;
    album: string;
    genre: string;
    songUrl: string;
    userId: string;
    likes: number;
}

export default function Player({ songs }: PlayerProps) {
    const [trackIndex, setTrackIndex] = useState(0);

    useEffect(() => {
        if (songs) {
            const index = songs.findIndex((song) => song.songUrl === musicTracks[trackIndex].songUrl);
            if (index !== -1) {
                setTrackIndex(index);
            }
        }
    }, [songs]);

    const musicTracks = songs ? songs.map((song) => ({
        title: song.title,
        songUrl: song.songUrl
    })) : [];

    const handleClickPrevious = () => {
        setTrackIndex((currentTrack) =>
            currentTrack === 0 ? musicTracks.length - 1 : currentTrack - 1
        );
    };

    const handleClickNext = () => {
        setTrackIndex((currentTrack) =>
            currentTrack < musicTracks.length - 1 ? currentTrack + 1 : 0
        );
    };

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            {musicTracks[trackIndex] && (
                <AudioPlayer
                    style={{ borderRadius: "1rem" }}
                    autoPlay
                    src={musicTracks[trackIndex].songUrl}
                    onPlay={(e) => console.log("onPlay")}
                    showSkipControls={true}
                    showJumpControls={false}
                    header={`Now playing: ${musicTracks[trackIndex].title}`}
                    footer="All music from: www.bensound.com"
                    onClickPrevious={handleClickPrevious}
                    onClickNext={handleClickNext}
                    onEnded={handleClickNext}
                />
            )}
        </div>
    );
}
