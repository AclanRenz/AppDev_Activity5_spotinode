// routes/favorites.js
const express = require('express');
const router = express.Router();
const favoritesModel = require('../models/favorites'); // Import your favorites model

// Route to get all favorite songs for a user
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;
    favoritesModel.getFavoritesByUserId(userId, (err, favorites) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to fetch favorites' });
        }
        // Render a view or send JSON data
        res.json(favorites); // Adjust this if you want to render a view instead
    });
});

// Route to add a song to favorites
router.post('/:userId/songs', (req, res) => {
    const userId = req.params.userId;
    const { musicId } = req.body; // Expecting { musicId: <id> } in the body
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

module.exports = router;
