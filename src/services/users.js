
import axios from "axios";

import { useAuthStore } from "../stores/auth";

const API = axios.create({
    baseURL: 'https://takarabako.onrender.com/api',
    headers: {
        token: localStorage.getItem('token')
    }
})

async function addGameToCollection(id) {
    const store = useAuthStore()
    try {
        const response = await API.patch('/users/favorite/add', {_id:id}, {
            headers: {
                token: store.token
            }
        })
        return response.data
    } catch (error) {
        return error
    }
}

export default {
    addGameToCollection
}