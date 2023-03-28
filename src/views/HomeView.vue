<template>
  <div>
    <nav v-if="!store.token">
      <router-link to="/login">Login</router-link>
      /
      <router-link to="/signup">Signup</router-link>
    </nav>

    <div v-else>
      {{ store.email }} / {{ store.username }}
      <ButtonCross @click="logout"> Logout </ButtonCross>
    </div>
    <HelloWorld />
    
  </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import ButtonCross from "../components/ButtonCross.vue";
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "App",

  data: () => ({
    store: useAuthStore(),
  }),
  methods: {
    logout() {
      this.store.logout();
      this.store.roleCheck(null);
    },
  },
  components: {
    ButtonCross,
    HelloWorld,
  },
};
</script>
