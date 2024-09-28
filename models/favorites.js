// models/favorites.js
const db = require('../config/db'); // Adjust the path to your database configuration

// Function to get favorites by user ID
const getFavoritesByUserId = (userId, callback) => {
    const query = 'SELECT * FROM favorites WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Function to add a song to favorites
const addSongToFavorites = (userId, musicId, callback) => {
    const query = 'INSERT INTO favorites (user_id, music_id) VALUES (?, ?)';
    db.query(query, [userId, musicId], (err, results) => {
        if (err) return callback(err);
        callback(null);
    });
};

// Function to remove a song from favorites
const removeSongFromFavorites = (userId, musicId, callback) => {
    const query = 'DELETE FROM favorites WHERE user_id = ? AND music_id = ?';
    db.query(query, [userId, musicId], (err, results) => {
        if (err) return callback(err);
        callback(null);
    });
};

module.exports = {
    getFavoritesByUserId,
    addSongToFavorites,
    removeSongFromFavorites,
};
