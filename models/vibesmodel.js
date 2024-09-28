const connect = require('../config/db');

//function get all song
exports.getSongs = (callback) => {
    const query = 'SELECT * FROM songs';
    connect.query(query, callback);
};

//function to add a new song
exports.addSong = (songData, callback) => {
    const query = 'INSERT INTO songs SET ?';
    connect.query(query, songData, callback);
};


//function get a song by Id
exports.getSongById = (songId, callback) => {
    const query = 'SELECT *FROM songs WHERE id = ?';
    connect.query(query, [songId], callback);
};

//function to update a song by id
exports.updateSong = (songId, updatedSongData, callback) => {
    const query = 'UPDATE songs SET ?  WHERE ID = ?';
    connect.query(query, [updatedSongData, songId], callback);
};

//function to delete a song by id
exports.deleteSong = (songId, callback) => {
    const query = 'DELETE FROM songs WHERE id = ?';
    connect.query(query, [songId], callback);
};