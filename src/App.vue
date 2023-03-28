<template>
  <v-app>
    <nav v-if="!store.token">
      <router-link to="/login">Login</router-link>
       / 
      <router-link to="/signup">Signup</router-link>
      
    </nav>
    <nav v-else> 
      {{ store.email }} / {{ store.username }}
      <ButtonCross @click="logout">
        Logout
      </ButtonCross>
      <ButtonCircle></ButtonCircle>
      <ButtonSquare></ButtonSquare>
      <ButtonTriangle>{{ name }}</ButtonTriangle>

    </nav>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import api from './services/authService'
import { useAuthStore } from './stores/auth'
import ButtonCross from './components/ButtonCross.vue';
import ButtonCircle from './components/ButtonCircle.vue';
import ButtonSquare from './components/ButtonSquare.vue';
import ButtonTriangle from './components/ButtonTriangle.vue';

export default {
  name: 'App',

  data: () => ({
    store: useAuthStore(),
    name: "volver"

  }),
  methods: {
    logout() {
      this.store.logout();
      this.store.roleCheck(null)
    },
  },
  components: {
    ButtonCross,
    ButtonCircle,
    ButtonSquare,
    ButtonTriangle
  }
}
</script>
