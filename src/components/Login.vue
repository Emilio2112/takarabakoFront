<template>
  <v-container>
    <v-sheet width="300" class="mx-auto">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="email"
          label="email"
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          type="password"
          v-model="password"
          label="password"
        ></v-text-field>

        <v-btn @click="userLogin" type="submit" block class="mt-2"
          >Submit</v-btn
        >
      </v-form>
    </v-sheet>
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
  },
};
</script>

<style scoped></style>
