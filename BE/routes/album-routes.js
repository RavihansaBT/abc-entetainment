const express = require('express');
const router = express.Router();
const { createAlbum, getAllAlbums, getAlbumById, updateAlbum, deleteAlbum, searchAlbums } = require('../controller/album-controler')

// @desc GET all albums
// @routr GET api/album/
// @access Public
router.get('/', getAllAlbums);

// @desc POST create album
// @routr POST api/album/
// @access Public
router.post('/', createAlbum);

// @desc PUT delete album
// @routr PUT api/album/search?q=
// @access Public
router.get('/search', searchAlbums);

// @desc GET all albums by id
// @routr GET api/album/:id
// @access Public
router.get('/:id', getAlbumById);

// @desc PUT update album
// @routr PUT api/album/:id
// @access Public
router.put('/:id', updateAlbum);


// @desc PUT delete album
// @routr PUT api/album/delete/:id
// @access Public
router.put('/delete/:id', deleteAlbum);


module.exports = router