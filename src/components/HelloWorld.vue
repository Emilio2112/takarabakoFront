<template>
  <SearchBar :games="games"></SearchBar>

</template>

<script>
import api from "../services/rawg";
import SearchBar from "./SearchBar.vue";
import GameCard from "./GameCard.vue";

export default {
  name: "HelloWorld",

  data: () => ({
    games: {},
    next: "",
    pages: 0,
  }),
  /*async created() {
    const response = await api.getAllGames();
    this.games = response.results
    this.next = response.next
    this.pages = response.count / 40
  },*/
  methods: {},
  components: {
    SearchBar,
    GameCard,
  },
};
</script>
