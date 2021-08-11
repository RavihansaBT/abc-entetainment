const Album = require('../models/Album-model');
const { v1: uuid } = require("uuid");

const createAlbum = async (req, res) => {
    try {
        let albumId = uuid()
        let album = {
            id: albumId,
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            releaseDate: req.body.releaseDate,
        }
        await Album.create(album)
        res.send({
            albumSaved: true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getAllAlbums = async (req, res) => {
    try {
        const albums = await Album.find({ isDeleted: false })
        res.send(albums)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const getAlbumById = async (req, res) => {
    try {
        const album = await Album.findOne({ id: req.params.id, isDeleted: false })
        res.send(album)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const updateAlbum = async (req, res) => {
    try {
        let album = {
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
            releaseDate: req.body.releaseDate,
        }

        await Album.updateOne({ id: req.params.id, isDeleted: false }, album)
        res.send({
            albumUpdated: true
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const deleteAlbum = async (req, res) => {
    try {
        let album = {
            isDeleted: true
        }

        await Album.updateOne({ id: req.params.id, isDeleted: false }, album)
        res.send({
            albumDeleted: true
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const searchAlbums = async (req, res) => {
    try {
        let str = `.*${req.query.q}.*`
        let re = new RegExp(str)

        // let searchKey = `/.*${req.query.q}.*/`
        let condition = {
            isDeleted: false,
            $or: [{ "title": re }, { "artist": re }]
        }

        let data = await Album.find(condition)
        res.send(data)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}


module.exports = {
    createAlbum,
    getAllAlbums,
    getAlbumById,
    updateAlbum,
    deleteAlbum,
    searchAlbums
}