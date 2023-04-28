<template>
  <v-app class="app">
    <NavBar />
    <v-main>
      <v-container>
        <v-row justify="center">
          <v-col
            align-self="center"
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="10"
            xl="10"
            xxl="8"
          >
            <router-view />
          </v-col>
        </v-row>
      </v-container>
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

  data: () => ({}),
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style scoped>
.app {
  background-color: #a1acb4;
}

.footer {
  max-height: 120px;
  font-size: 16px;
  bottom: 0;
}
</style>
