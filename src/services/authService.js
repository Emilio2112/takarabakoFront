import axios from "axios";
import { useAuthStore } from "../stores/auth";

const API = axios.create({
    baseURL: "https://takarabako.onrender.com/api",
    headers: {
        token: localStorage.getItem('token')
    }
})

async function signup(newUser) {
    try {
        const response = await API.post('/auth/signup', newUser)
        return response.data
    } catch (error) {
        return {error: error.message}
    }
}

async function login(newUser) {
    try {
        const response = await API.post('/auth/login', newUser)
        return response.data
    } catch (error) {
        return {error: error.message}
    }
}

async function deleteUser(remove) {
    const store = useAuthStore()
    try {
        const response = await API.delete('/users/profile', remove,{
            headers: {
                token: store.token
            }
        })
        store.logout()
        return response.data
    } catch (error) {
        return {error: error.message}
    }
}

async function updateUser(newData) {
    const store = useAuthStore()
    try {
        const response = await API.put('/users/profile', newData, {
            headers:{
                token: store.token
            }
        })
        return response.data
    } catch (error) {
        return {error: error.message}
    }
}

async function getUser() {
    const store = useAuthStore()
    try {
        const response = await API.get('/users/profile', {
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
    signup,
    login,
    deleteUser,
    updateUser,
    getUser
}