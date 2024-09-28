const db = require('../config/connect');
const vibesmodel = require('../model/vibesmodel');

//get all songs
exports.getSongs = (req, res) => {
    vibesmodel.getSongs((err, results)=>{
        if (err) {
            console.error('Error fetching songs: ', err);
            return res.status(500).send('Error fetching songs');
        }
        res.render('index', {
            title: 'Audio Player Example',
            tracks: results
        });
    });
};

//show form to upload a new song
exports.showUploadForm = (req, res) => {
    res.render('upload');
}

//add a new song
exports.addSong = (req, res) => {
    const songData = {
        title: req.body.title,
        artist: req.body.artist,
        image_path: req.files['image_cover'][0].path,
        file_path: req.files['songFile'][0].path
    };
    vibesmodel.addSong(songData, (err,result)=>{
        if (err) {
            console.error('Error adding song: ', err);
            return res.status(500).send('Error adding song');
        }
        res.redirect('/');
    });
};

//get a song by id for editing
exports.getSongById = (req, res) => {
    const songId = req.params.id;

    vibesmodel.getSongById(songId, (err, result) => {
        if (err) {
            console.error('Error fetching song by Id: ', err);
            return res.status(600).send('Error fetching song by ID');
        }
        res.render('editForm', { song: result[0] });
    });
};

//update an existing song
exports.updateSong = (req, res) => {
    const songId = req.params.id;
    const { title, artist } = req.body;

    let songFilePath = null;
    if (req.file) {
        songFilePath = req.file.path;
    }

    const query = 'UPDATE songs SET title = ?, artist = ?' + (songFilePath ? ', file_path = ?' : '') + 'WHERE id = ?';
    const values = songFilePath ? [title, artist, songFilePath, songId] : [title, artist, songId];

    db.query(query, values, (error, results) => {
        if (error) {
            console.error('Error updating song: ', error);
            return res.status(500).send('Error updating song');
        }
        res.redirect('/');
    });
};

//delete song
exports.deleteSong = (req, res) => {
    const songId = req.params.id;

    const query = 'DELETE FROM songs WHERE id = ?';

    db.query(query, [songId], (error, results) => {
        if (error) {
            console.error('Error deleting song: ', error);
            return res.status(500).send('Error deleting song');
        }
        res.redirect('/');
    });
};