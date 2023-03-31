<template>
  <v-app class="app">
    <NavBar/>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "../src/components/NavBar.vue";



export default {
  name: "App",

  data: () => ({
  }),
  components: {
    NavBar
  }
};
</script>

<style scoped>
.app {
  background-color: #a1acb4;
}
</style>
