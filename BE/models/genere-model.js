const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    id: {
        type: String
    },
    Genre: {
        type: String
    },
    album: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Album'
    }
}, {
    timestamps: true
})

const Genre = mongoose.model("Genre", albumSchema);

module.exports = Genre;