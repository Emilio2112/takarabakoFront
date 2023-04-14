import axios from "axios";

const API = axios.create({
    baseURL: 'https://api.rawg.io/api',
})

const apiKey = "?key=68b518456a524e219c0ead6598b1beda"

async function getAllGames() {
    try {
        const response = await API.get(`/games${apiKey}&page_size=40`)
        return response.data
    } catch (error) {
        return {error: error.message} 
    }
}

async function getGameByName(name, page=1) {
    try {
        const response = await API.get(`/games${apiKey}&search=${name}&page_size=30&page=${page}`)
        return response.data
    } catch (error) {
        return {error: error.message} 
    }
}

async function getOneGame(id) {
    try {
        const response = await API.get(`/games/${id}${apiKey}`)
        return response.data
    } catch (error) {
        return {error: error.message} 
    }
}

async function getGameScreenshots(id) {
    try {
        const response = await API.get(`/games/${id}/screenshots${apiKey}`)
        return response.data.results
    } catch (error) {
        return {error: error.message} 
    }
}

export default {
    getAllGames,
    getGameByName,
    getOneGame,
    getGameScreenshots
}