<template>
  <v-sheet width="300" class="mx-auto">
    <v-list lines="one">
      <v-list-item v-for="(game, idx) in games" :key="idx">{{
        game.name
      }}</v-list-item>
    </v-list>
  </v-sheet>
</template>

<script>
import api from "@/services/rawg.js";

export default {
  name: "HelloWorld",

  data: () => ({
    games: [],
    search: "",
    rules: [
      (value) => {
        if (value) return true;

        return "insert Game to search";
      },
    ],
  }),
  computed: {
    searchGame: function () {
      return this.games.filter((game) => {
        return game.name.match(this.search);
      });
    },
  },
  async created() {
    this.games = await api.getAllGames();
  },
};
</script>
