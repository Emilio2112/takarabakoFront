<template>
  <div>
    <SearchBar :games="games"></SearchBar>
    <div v-for="(game, idx) in games" :key="idx">
      {{ idx }}
    {{ game.name }}
  </div>
    <v-btn> Next</v-btn>

  </div>
</template>

<script>
import api from "@/services/rawg.js";
import SearchBar from "./SearchBar.vue"

export default {
  name: "HelloWorld",

  data: () => ({
    games: [],
    next: "",
    pages: 0
  }),
  async created() {
    const response = await api.getAllGames();
    this.games = response.results
    this.next = response.next
    this.pages = response.count / 40
  },
  methods: {
  },
  components: {
    SearchBar,
  }
};
</script>
