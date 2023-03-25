<template>
  <div>
    <input v-model="search" type="text" @keyup.enter="searchGameName" />
    <button @click="searchGameName">buscar</button>
    <div v-for="game in games">
      {{ game.name }}
    </div>
    <v-btn @click="changePage(page - 1)">PREV</v-btn>
    {{ page }}/{{ Math.ceil(pages) }}
    <v-btn @click="changePage(page + 1)">NEXT</v-btn>
  </div>
</template>

<script>
import api from "@/services/rawg.js";

export default {
  name: "SearchBar",

  data: () => ({
    search: null,
    next: "",
    games: [],
    platforms: [],
    page: 1,
    pages: 0,
  }),
  methods: {
    async searchGameName() {
        const response = await api.getGameByName(this.search);
        this.games = response.results;
        this.next = response.next;
        this.pages = response.count / 40;
    },
    async changePage(page) {
      this.page = page >= 0 || page > this.pages ? this.page : page;
      const response = await api.getGameByName(this.search, page);
      this.games = response.results;
      this.next = response.next;
      this.page = page;
    },
  },
};
</script>
