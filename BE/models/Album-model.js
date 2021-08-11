const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Genre"
    },
    releaseDate: {
        type: Date,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Album = mongoose.model("Album", albumSchema);

module.exports = Album;