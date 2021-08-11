import axios from "axios";

export function getGenre() {
    return axios.get('/api/genre/')
}

export function getAlbums() {
    return axios.get('/api/album/')
}

export function createAlbum(albumData) {
    return axios.post('/api/album/', albumData)
}

export function updateAlbum(id, albumData) {
    return axios.put(`/api/album/${id}`, albumData)
}

export function getAlbumById(id) {
    return axios.get(`/api/album/${id}`)
}

export function deleteAlbum(id) {
    return axios.put(`/api/album/delete/${id}`)
}

export function searchAlbum(keyword) {
    return axios.get(`/api/album/search?q=${keyword}`)
}

export function addInfo(data) {
    return axios.post(`/api/genre/`, data)
}