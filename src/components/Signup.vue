<template>
  <div>
    <v-sheet width="300" class="mx-auto">
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
          type="password"
          v-model="password"
          label="password"
        ></v-text-field>

        <v-btn @click="signupUser" type="submit" block class="mt-2"
          >Submit</v-btn
        >
      </v-form>
    </v-sheet>
  </div>
</template>

<script>
import api from "../services/authService";
import { useAuthStore } from "../stores/auth";

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
  }),
  methods: {
    async signupUser() {
        const newUser = {
            email: this.email,
            username: this.username,
            password: this.password
        }
      const response = await api.signup(newUser);
      if (response.error) {
        alert("Error");
      } else {
        this.authStore.login(response.token, response.email);
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
