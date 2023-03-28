<template>
  <v-app class="app">
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";


export default {
  name: "App",

  data: () => ({
  }),

};
</script>

<style scoped>
.app {
  background-color: #a1acb4;
}
</style>
