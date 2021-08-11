const express = require('express');
const router = express.Router();
const { getAllGenre, createGenre } = require('../controller/genere-controller')

// @desc GET all genre
// @routr GET api/genre/
// @access Public
router.get('/', getAllGenre);

// @desc create genre
// @routr GET api/genre/
// @access Public
router.post('/', createGenre);

module.exports = router