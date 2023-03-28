<template>
  <div>
    <input v-model="search" type="text" @keyup.enter="searchGameName" />
    <button @click="searchGameName">buscar</button>
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="(game, idx) in games" :key="idx">
        <GameCard :game="game"></GameCard>
      </v-col>
    </v-row>
    <div v-if="games.length" class="text-center">
      <v-btn v-show="page !=1" class="button" rounded="xs" @click="changePage(page - 1)">
      Back
      <span class="material-icons" id="iconTriangle">change_history</span>
    </v-btn>
    {{ this.page }} / {{ Math.ceil(pages) }}
    <v-btn v-show="page != Math.ceil(pages)" class="button" rounded="xs" @click="changePage(page + 1)">
      Next
      <span class="material-icons" id="iconCircle">radio_button_unchecked</span>
    </v-btn>
  </div>
  </div>
</template>

<script>
import api from "@/services/rawg.js";
import GameCard from "./GameCard.vue";

export default {
  name: "SearchBar",

  data: () => ({
    search: null,
    next: "",
    games: {},
    page: 1,
    pages: 0
  }),
  methods: {
    async searchGameName() {
      const response = await api.getGameByName(this.search);
      this.listCount = response.count
      this.games = response.results;
      this.next = response.next;
      this.pages = response.count / 40;
      if (this.listCount < this.pagesize) {
        this.historyList = this.games
      }
    },
    async changePage(page) {
      this.page = page >= 0 || page > this.pages ? this.page : page;
      const response = await api.getGameByName(this.search, page);
      this.games = response.results;
      this.next = response.next;
      this.page = page;
      window.scrollTo(0,0)
    },
	},
  components: {
    GameCard,
  },
};
</script>

<style scoped>

.button {
    background-color: #3e5161;
    color: #a1acb4;
  }
  #iconTriangle {
      color: #38DEC6
  }
  #iconCircle {
      color: #EF6F69
  }
</style>
