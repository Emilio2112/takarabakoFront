<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="align-end text-white"
      height="200"
      :src="game.background_image"
      cover
    >
      <v-card-title class="title">{{ game.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      {{ game.released }}
    </v-card-subtitle>

    <v-card-text>
      <div>{{ game.rating }}
    {{ game.id }}</div>
    </v-card-text>

    <v-card-actions>
      <router-link :to="{name: 'gameview', params: {id: game.id}}">Vamos</router-link>
    </v-card-actions>
  </v-card>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "GameCard",
  props: {
    game: Object,
  },
};
</script>

<style scoped>
.title {
  background-color: #9e9e9e70;
}
</style>
