const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Playlist = require('../../models/Playlist');
const Song = require('../../models/Songs');

// Create a new playlist
router.post('/:ownerId', async (req, res) => {
  try {
    const {name} = req.body;
    const {ownerId} = req.params;

    const playlist = new Playlist({
      name,
      owner: ownerId,
    });

    await playlist.save();

    res.status(201).send(playlist);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add a song to a playlist
router.post('/:playlistId/add/:songId', async (req, res) => {
  try {
    const {playlistId, songId} = req.params;

    // Retrieve the playlist document by its ID
    const playlist = await Playlist.findById(playlistId);

    // Retrieve the song document by its ID
    const song = await Song.findById(songId);

    // Add the song ID to the playlist's songs array
    playlist.songs.push(song._id);

    // Save the updated playlist document
    await playlist.save();

    res.status(200).send('Song added to playlist');
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all playlists
router.get('/get', async (req, res) => {
  try {
    const playlists = await Playlist.find();
    res.json(playlists);
  } catch (error) {
    res.status(500).json({error: 'Internal server Error'});
  }
});

// Get a playlist by ID and populate its songs
router.get('/:playlistId', async (req, res, next) => {
  try {
    const {playlistId} = req.params;

    if (!mongoose.Types.ObjectId.isValid(playlistId)) {
      return res.status(400).json({error: 'Invalid playlist ID'});
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({error: 'Playlist not found'});
    }

    // Fetch songs by their IDs
    const songIds = playlist.songs;
    const songs = await Song.find({_id: {$in: songIds}});

    // Add the playlist name and songs to the response object
    const playlistData = {
      _id: playlist._id,
      name: playlist.name,
      owner: playlist.owner,
      collaborators: playlist.collaborators,
      requests: playlist.requests,
      songs: songs,
    };

    res.status(200).json(playlistData);
  } catch (error) {
    next(error);
  }
});

// add collaborators

module.exports = router;
