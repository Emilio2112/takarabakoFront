<template>
  <v-container class="input">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="12" lg="8">
        Introduce tus datos
        <v-form fast-fail @submit.prevent>
          <v-text-field
            type="text"
            v-model="username"
            label="username"
          ></v-text-field>

          <v-text-field
            v-model="email"
            label="email"
            :rules="emailRules"
          ></v-text-field>

          <v-text-field
            :type="show1 ? 'text' : 'password'"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show1 = !show1"
            v-model="password"
            counter
            label="password"
          ></v-text-field>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="button" rounded="xs">
              Registro
              <span class="material-icons" id="iconCross">close</span>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="button" rounded="xs" @click="clean">
              Borrar
              <span class="material-icons" id="iconSquare"
                >check_box_outline_blank</span
              >
            </v-btn>
            <v-spacer></v-spacer>
            <ButtonBack> </ButtonBack>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "../services/authService";
import { useAuthStore } from "../stores/auth";
import ButtonBack from "./ButtonBack.vue";

export default {
  data: () => ({
    username: null,
    email: null,
    password: null,
    emailRules: [
      (value) => {
        if (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(value))
          return true;

        return "Email no valido.";
      },
    ],
    authStore: useAuthStore(),
    show1: false,
  }),
  methods: {
    async signupUser() {
      const newUser = {
        email: this.email,
        username: this.username,
        password: this.password,
      };
      const response = await api.signup(newUser);
      if (response.error) {
        alert("Error");
      } else {
        this.authStore.login(response.token, response.email);
        this.$router.push({ name: "home" });
      }
    },
    clean() {
      this.username = null;
      this.email = null;
      this.password = null;
    },
  },
  components: {
    ButtonBack,
  },
};
</script>

<style scoped>
.input {
  margin-top: 5vh;
  position: static;
}

.button {
  background-color: #3e5161;
  color: #a1acb4;
  box-shadow: inset 0 4px 5px 0 #a1acb48d, 0 5px 10px 1px #000;
}

.button:active {
  box-shadow: inset 0 5px 6px 5px #000, 0 0 0 0;
}

#iconCross {
  color: #9cade2;
}
#iconCircle {
  color: #ef6f69;
}

#iconSquare {
  color: #d591bf;
}
</style>
