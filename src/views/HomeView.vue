<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="10" md="8" xl="8">
        <v-img src="../takaralogo.jpg">
          <v-container>
            <v-row class="text-center">
              <v-col>
                <h1>Takarabako</h1>
              </v-col>
            </v-row>
          </v-container>
        </v-img>
      </v-col>
    </v-row>
    <v-row class="text-center">
      <v-col>
        <p>
          Welcome to Takarabako!!! <br />
          <v-divider class="ma-2"></v-divider>
          Now you can have your video game collection organized and at your
          fingertips.<br />
          <v-divider class="ma-2"></v-divider>
          You just have to use the search engine (powered by RAWG) and add the
          games to your collection.<br />
          <v-divider class="ma-2"></v-divider>
          Then you can organize your backlog, rate the finished games, indicate
          their duration... and compare these stats with the community.
        </p>
      </v-col>
    </v-row>
    <v-row justify="space-around" v-if="!store.token">
      <v-col cols="auto">
        <v-btn class="button" rounded="xs" @click="toLogin">
          Login
          <span class="material-icons" id="iconCross">close</span>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn class="button" rounded="xs" @click="toSignup">
          Signup
          <span class="material-icons" id="iconSquare"
            >check_box_outline_blank</span
          >
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from '../stores/auth';
export default {
  name: "App",

  data: () => ({
    store: useAuthStore(),
  }),
  methods: {
    toLogin() {
      this.$router.push({ name: "login" })
    },
    toSignup() {
      this.$router.push({ name: "signup" })
    },
  }
};
</script>

<style scoped>
.button {
  background-color: #3e5161;
  color: #a1acb4;
  box-shadow: inset 0 4px 5px 1px #a1acb48d, 0 5px 10px 1px #000;
}

.button:active {
  box-shadow: inset 0 5px 6px 5px #000, 0 0 0 0;
}
#iconSquare {
  color: #d591bf;
}
#iconCross {
  color: #9cade2;
}
</style>
