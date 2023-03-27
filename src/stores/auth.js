import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      token: useStorage('token', null),
      email: useStorage('email', null),
      username: useStorage('username', null),
      role: useStorage('role', null)
    }
  },
  getters: {
    isLoggedIn() {
      return this.token != null
    },
    userEmail() {
      return this.email
    },
    userName() {
      return this.username
    },
    userRole() {
      return this.role
    }
  },
  actions: {
    logout() {
      this.token = null
      this.email = null
      this.username = null
      this.role = null
    },
    login(token, email, username) {
      this.token = token
      this.email = email
      this.username = username
      },
    roleCheck(role){
      this.role = role
    }

  },
})
