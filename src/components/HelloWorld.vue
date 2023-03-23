<template>
  <div>
    <SearchBar :games="games"></SearchBar>

    WOLLLLAA
  </div>
</template>

<script>
import api from "@/services/rawg.js";
import SearchBar from "./SearchBar.vue"

export default {
  name: "HelloWorld",

  data: () => ({
    games: []
  }),
  async created() {
    this.games = await api.getAllGames();
  },
  components: {
    SearchBar,
  }
};
</script>
