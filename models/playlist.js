// models/playlists.js
const db = require('../config/db');

// Function to create a new playlist
const createPlaylist = (userId, name, callback) => {
    const sql = 'INSERT INTO playlists (user_id, name) VALUES (?, ?)';
    db.query(sql, [userId, name], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.insertId);
    });
};

// Function to get all playlists for a user
const getPlaylistsByUserId = (userId, callback) => {
    const sql = 'SELECT * FROM playlists WHERE user_id = ?';
    db.query(sql, [userId], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Function to add a song to a playlist
const addSongToPlaylist = (playlistId, musicId, callback) => {
    const sql = 'INSERT INTO playlist_songs (playlist_id, music_id) VALUES (?, ?)';
    db.query(sql, [playlistId, musicId], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

// Function to remove a song from a playlist
const removeSongFromPlaylist = (playlistId, musicId, callback) => {
    const sql = 'DELETE FROM playlist_songs WHERE playlist_id = ? AND music_id = ?';
    db.query(sql, [playlistId, musicId], (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results);
    });
};

module.exports = {
    createPlaylist,
    getPlaylistsByUserId,
    addSongToPlaylist,
    removeSongFromPlaylist,
};
