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

export default {
    addGame
}