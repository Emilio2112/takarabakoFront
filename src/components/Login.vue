<template>
  <v-container class="input">
    <v-form fast-fail @submit.prevent>
      <v-text-field  v-model="email" label="email" :rules="emailRules">
      </v-text-field>
      <v-text-field 
        type="password"
        v-model="password"
        label="password"
      ></v-text-field>
      <v-container>
        <v-row justify="space-around">
          <v-spacer></v-spacer>
          <v-col>
            <v-btn @click="userLogin" type="submit" class="button" rounded="xs"
              >Login
              <span class="material-icons" id="iconCross">close</span>
            </v-btn>
          </v-col>
          <v-col>
            <v-btn class="button" rounded="xs" @click="goBack">
              Volver
              <span class="material-icons" id="iconCircle"
                >radio_button_unchecked</span
              >
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-form>
  </v-container>
</template>

<script>
import api from "../services/authService";
import { useAuthStore } from "../stores/auth";

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
};
</script>

<style scoped>
.input {
  margin-top: 20vw;
  position: static;
}
.button {
  background-color: #3e5161;
  color: #a1acb4;
  position: static;
}

#iconCross {
  color: #9cade2;
}

#iconCircle {
  color: #ef6f69;
}
</style>
