<template>
  <v-container class="input">
    <v-row justify="center">
      <v-col cols="12" sm="12" md="12" lg="8">
        Acceso a Takarabako
        <v-form fast-fail @submit.prevent>
          <v-text-field
            v-model="email"
            label="email"
            autofocus
            :rules="emailRules"
          >
          </v-text-field>
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
            <v-btn @click="userLogin" type="submit" class="button" rounded="xs"
              >Login
              <span class="material-icons" id="iconCross">close</span>
            </v-btn>
            <v-spacer></v-spacer>
            <ButtonBack></ButtonBack>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
  <v-container>
    <v-row justify="end">
      <v-col cols="4" xs="12" sm="5" md="4">
        <RouterLink to="/signup">Quiero registrarme</RouterLink>
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
    email: "",
    emailRules: [
      (value) => {
        if (/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(value))
          return true;

        return "Email no valido.";
      },
    ],
    password: "",
    username: "",
    authStore: useAuthStore(),
    show1: false,
  }),
  methods: {
    async userLogin() {
      const user = {
        email: this.email,
        password: this.password,
      };
      const response = await api.login(user);
      if (response.error) {
        alert("Email o contraseña no validos");
      } else {
        this.authStore.login(response.token, response.email, response.username);
        this.$router.push({ name: "home" });
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  components: {
    ButtonBack,
  },
};
</script>

<style scoped>
.input {
  margin-top: 5vw;
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
</style>
