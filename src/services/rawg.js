import axios from "axios";

const API = axios.create({
    baseURL: 'https://api.rawg.io/api',
})

const apiKey = "?key=c6b1f490d3714d018b22b0603ada77ec"

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
        const response = await API.get(`/games${apiKey}&search=${name}&page_size=40&page=${page}`)
        return response.data
    } catch (error) {
        return {error: error.message} 
    }
}

export default {
    getAllGames,
    getGameByName
}