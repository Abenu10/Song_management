const mongoose = require('mongoose');
const express = require('express');
const cloudinary = require('cloudinary');
const {
  uploadToCloudinary,
  uploadToCloudinaryV,
  removeFromCloudinary,
  uploadToCloudinaryA,
} = require('./../../services/cloudinary');
const router = express.Router();
const auth = require('../../middleware/auth');
const upload = require('../../middleware/upload');
const Song = require('../../models/Songs');

// @router GET api/songs
// @desc Test router
// @access Public

router.get('/', (req, res) => res.send('Songs route'));

// TODO:Create song post

router.post('/new/:id', upload.fields([{ name: 'postAudio', maxCount: 1 }, { name: 'postImage', maxCount: 1 }]), async (req, res) => {
  try {
    // upload audio to cloudinary
    const audioData = await uploadToCloudinary(req.files['postAudio'][0].path, 'post-songs');
    // upload image to cloudinary
    const imageData = await uploadToCloudinary(req.files['postImage'][0].path, 'post-images');

    // create new song with audio url, image url and public ID
    const song = new Song({
      title: req.body.title,
      artist: req.body.artist,
      album: req.body.album,
      genre: req.body.genre,
      songUrl: audioData.secure_url,
      imageUrl: imageData.secure_url,
      publicId: audioData.public_id,
      userId: req.params.id,
    });

    // save song to database
    const savedSong = await song.save();
    res.status(200).json({message: 'song created', song: savedSong});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({message: 'Server error'});
  }
});
// list all songs
router.get('/list', async (req, res) => {
  try {
    const songs = await Song.find();
    res.status(200).json({message: 'list of songs', song: songs});
  } catch (error) {
    res.status(400).send(error);
  }
});

// Filter by genre and list all songs
router.get('/list/:genre', async (req, res) => {
  try {
    const songs = await Song.find({genre: req.params.genre});
    res.status(200).json({message: 'list of songs by genre', song: songs});
  } catch (error) {
    res.status(400).send(error);
  }
});

// TODO: List songs of a user
router.get('/list/:id', async (req, res) => {
  try {
    const songs = await Song.find({userId: req.params.id});
    res.status(200).json({message: 'list of songs by user', song: songs});
  } catch (error) {
    res.status(400).send(error);
  }
});

//  update a song
router.put('/:id', async (req, res) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({message: 'song updated', song: song});
  } catch (error) {
    res.status(400).send(error);
  }
});
//  TODO: Remove a song
router.delete('/:id', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) {
      return res.status(404).send({message: 'Song not found'});
    }
    const publicId = song.publicId.split('/').pop();
    await removeFromCloudinary(publicId);
    const deletedSong = await Song.findByIdAndDelete(req.params.id);
    res.status(200).json({message: 'song updated', song: deletedSong});
  } catch (error) {
    res.status(400).send(error);
  }
});

// Search
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    const songs = await Song.find({$text: {$search: query}});
    res.status(200).send(songs);
  } catch (error) {
    res.status(400).send(error);
  }
});

// TODO: like song
//song id on the parameter , user id in the req.body
router.put('/:id/like', async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song.likes.includes(req.body.userId)) {
      await song.updateOne({$push: {likes: req.body.userId}});
      res.status(200).send('The song has been liked');
    } else {
      await song.updateOne({$pull: {likes: req.body.userId}});
      res.status(200).json('The song has been disliked');
    }
  } catch (err) {
    res.status(500).send(err);
  }
});
// Generate stats
router.get('/stats', async (req, res) => {
  try {
    const totalSongs = await Song.countDocuments();
    const totalArtists = await Song.distinct('artist').countDocuments();
    const totalAlbums = await Song.distinct('album').countDocuments();
    const totalGenres = await Song.distinct('genre').countDocuments();

    const songsByGenre = await Song.aggregate([
      {$group: {_id: '$genre', count: {$sum: 1}}},
      {$sort: {count: -1}},
    ]);

    const songsByArtist = await Song.aggregate([
      {$group: {_id: '$artist', count: {$sum: 1}}},
      {$sort: {count: -1}},
    ]);

    const songsByAlbum = await Song.aggregate([
      {$group: {_id: '$album', count: {$sum: 1}}},
      {$sort: {count: -1}},
    ]);

    const stats = {
      totalSongs,
      totalArtists,
      totalAlbums,
      totalGenres,
      songsByGenre,
      songsByArtist,
      songsByAlbum,
    };

    res.status(200).send(stats);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
