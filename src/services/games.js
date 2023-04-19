import axios from "axios";
import { useAuthStore } from "../stores/auth";

const API = axios.create({
    baseURL: "https://takarabako.onrender.com/api",
    headers: {
        token: localStorage.getItem('token')
    }
})

async function addGame(newGame) {
    const store = useAuthStore()
    try {
        const response = await API.post('/games', newGame, {
            headers: {
                token: store.token
            }
        })
        return response.data
    } catch (error) {
        return {error: error.message}
    }
}

async function getGame(id) {
    const store = useAuthStore()
    try {
        const response = await API.get(`/games/${id}`, {
            headers: {
                token: store.token
            }
        })
        return response.data
    } catch (error) {
        return {error: error.message}
    }
}

async function getAllGames() {
    try {
        const response = await API.get('/games')
        return response.data
    } catch (error) {
        return {error: error.message}
    }
}

async function updateGameStats (id, finalTime, finalRating) {
    const store = useAuthStore()
    try {
        const response = await API.put(`/games/${id}`, {rating: finalRating, time: finalTime} ,{
            headers: {
                token: store.token
            }
        })
        console.log("culo", response.data)
        return response.data
    } catch (error) {
        return {error: error.message}
    }
}

export default {
    addGame,
    getGame,
    getAllGames,
    updateGameStats
}