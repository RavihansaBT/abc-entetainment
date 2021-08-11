const Genre = require('../models/genere-model');
const { v1: uuid } = require("uuid");

const getAllGenre = async (req, res) => {
    try {
        const genare = await Genre.find()
        res.send(genare)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

const createGenre = async (req, res) => {
    try {
        let genreId = uuid()
        let genreName = req.body.Genre
        let genare = {
            id: genreId,
            Genre: genreName
        }
        await Genre.create(genare)
        res.send({
            genreSaved: true
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = {
    getAllGenre,
    createGenre

}