
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

async function addGameToPlaying(id) {
    const store = useAuthStore()
    try {
        const response = await API.patch('users/playing/add', {_id:id}, {
            headers: {
                token: store.token
            }
        })
        return response.data
    } catch (error) {
        return error
    }
}

async function addGameToCompleted(id) {
    const store = useAuthStore()
    try {
        const response = await API.patch('users/completed/add', {_id:id}, {
            headers: {
                token: store.token
            }
        })
        return response.data
    } catch (error) {
        return error
    }
}

async function viewCollection() {
    const store = useAuthStore()
    try {
        const response = await API.get('users/collection', {
            headers: {
                token: store.token
            }
        })
        return response.data
    } catch (error) {
        return error
    }
}

async function viewPlaying() {
    const store = useAuthStore()
    try {
        const response = await API.get('users/playing', {
            headers: {
                token: store.token
            }
        })
        return response.data
    } catch (error) {
        return error
    }
}

async function viewCompleted() {
    const store = useAuthStore()
    try {
        const response = await API.get('users/completed', {
            headers: {
                token: store.token
            }
        })
        return response.data
    } catch (error) {
        return error
    }
}

async function getAllUsers() {
    const store = useAuthStore()
    try {
        const response = await API.get('users/', {
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
    addGameToCollection,
    viewCollection,
    viewPlaying,
    viewCompleted,
    addGameToPlaying,
    addGameToCompleted,
    getAllUsers
}