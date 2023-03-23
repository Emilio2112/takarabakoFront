<template>
    <div>
      <input v-model="search" type="text" @keyup.enter="searchGameName">
      <button @click="searchGameName"> buscar </button>
      <div v-for="game in games">
      {{ game.name }}
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/services/rawg.js";
  
  export default {
    name: "SearchBar",
  
    data: () => ({
      search: "",
      games: []
    }),
    methods: {
      async searchGameName() {
        this.games = await api.getGameByName(this.search)
      }
    }
  };
  </script>
  