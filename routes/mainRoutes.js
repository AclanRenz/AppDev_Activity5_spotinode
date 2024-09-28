// routes/playlists.js
const express = require('express');
const router = express.Router();
const playlistsModel = require('../models/playlists');

// Route to create a new playlist
router.post('/', (req, res) => {
    const { userId, name } = req.body;
    playlistsModel.createPlaylist(userId, name, (err, playlistId) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to create playlist' });
        }
        res.status(201).json({ id: playlistId, name });
    });
});

// Route to get all playlists for a user
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    playlistsModel.getPlaylistsByUserId(userId, (err, playlists) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch playlists' });
        }
        res.json(playlists);
    });
});

// Route to add a song to a playlist
router.post('/:id/songs', (req, res) => {
    const playlistId = req.params.id;
    const { musicId } = req.body;
    playlistsModel.addSongToPlaylist(playlistId, musicId, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add song to playlist' });
        }
        res.status(200).json({ message: 'Song added to playlist' });
    });
});

// Route to remove a song from a playlist
router.delete('/:playlistId/songs/:musicId', (req, res) => {
    const { playlistId, musicId } = req.params;
    playlistsModel.removeSongFromPlaylist(playlistId, musicId, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to remove song from playlist' });
        }
        res.status(200).json({ message: 'Song removed from playlist' });
    });
});


module.exports = router;

// Route to get all favorite songs for a user
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    favoritesModel.getFavoritesByUserId(userId, (err, favorites) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch favorites' });
        }
        res.json(favorites); // You can render a view or send JSON data
    });
});

// Route to add a song to favorites
router.post('/:userId/songs', (req, res) => {
    const userId = req.params.userId;
    const { musicId } = req.body;
    favoritesModel.addSongToFavorites(userId, musicId, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to add song to favorites' });
        }
        res.status(200).json({ message: 'Song added to favorites' });
    });
});

// Route to remove a song from favorites
router.delete('/:userId/songs/:musicId', (req, res) => {
    const { userId, musicId } = req.params;
    favoritesModel.removeSongFromFavorites(userId, musicId, (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to remove song from favorites' });
        }
        res.status(200).json({ message: 'Song removed from favorites' });
    });
});

