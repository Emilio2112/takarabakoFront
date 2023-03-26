<template>
  <v-app>
    <nav>
      <router-link to="/login">Login</router-link>
       / 
      <router-link to="/signup">Signup</router-link>
      <v-btn @click="logout">logout</v-btn>
    </nav>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import api from './services/authService'
import { useAuthStore } from './stores/auth'

export default {
  name: 'App',

  data: () => ({
    store: useAuthStore()
  }),
  methods: {
    logout() {
      this.store.logout();
      this.store.roleCheck(null)
    },
  }
}
</script>
