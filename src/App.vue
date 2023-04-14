<template>
  <v-app class="app">
    <NavBar/>

    <v-main class="main">
      <router-view />
    </v-main>
    <Footer class="footer"></Footer>
  </v-app>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
import NavBar from "../src/components/NavBar.vue";
import Footer from "./components/Footer.vue";



export default {
  name: "App",

  data: () => ({
  }),
  components: {
    NavBar,
    Footer
  }
};
</script>

<style scoped>
.app {
  background-color: #a1acb4;
}
.main {
  margin-top: 60px;
}

.footer {
    max-height: 120px;
    font-size: 16px;
    bottom: 0;              
}
</style>
