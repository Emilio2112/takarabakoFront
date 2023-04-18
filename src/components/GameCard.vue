<template>
  <v-card class="card" max-width="400" elevation="20" hover :to="{name: 'gameview', params: {id: game.id}}">
    <v-img
      class="align-end text-white"
      height="200"
      :src="game.background_image"
      cover
    >
      <v-card-title class="title">{{ game.name }}</v-card-title>
    </v-img>

    <v-card-subtitle v-if="game.released" class=" d-flex justify-end text-h6 font-weight-black pa-4">
      <span class="mdi mdi-gamepad pr-1"></span>
      {{ onlyYear }}
    </v-card-subtitle>
    <v-card-subtitle v-else class=" d-flex justify-end text-h6 font-weight-black pa-4">
      <span class="mdi mdi-gamepad pr-1"></span>
      <p>No Date</p>     
    </v-card-subtitle>
    <v-card-text class="pa-4">


    <v-chip class="chip ma-1" variant="elevated" v-for="(console, idx) in game.platforms" :key="idx">
    {{ console.platform.name }}</v-chip>

</v-card-text>
  </v-card>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "GameCard",
  props: {
    game: Object,
  },
  computed: {
    onlyYear(date) {
      date = this.game.released
      return date.slice(0,4)
    }
  }
};
</script>

<style scoped>
.card{
  background-color:#76858F
}
.title {
  background-color: #9e9e9e70;
}
.chip{
  color: #A1ACB4;
  background-color: #3E5161
}
</style>
