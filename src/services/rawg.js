import axios from "axios";

const API = axios.create({
    baseURL: 'https://api.rawg.io/api',
})

const apiKey = "?key=c6b1f490d3714d018b22b0603ada77ec"

async function getAllGames() {
    try {
        const response = await API.get(`/games${apiKey}&page_size=8`)
        return response.data.results
    } catch (error) {
        return {error: error.message} 
    }
}

async function getGameByName(name) {
    try {
        const response = await API.get(`/games${apiKey}&search=${name}`)
        return response.data.results
    } catch (error) {
        return {error: error.message} 
    }
}

export default {
    getAllGames,
    getGameByName
}