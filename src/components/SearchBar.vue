<template>
  <v-card class="search">
    <v-container>
      <v-row align-content="center">
        <v-col cols="12" sm="12" md="10" lg="10">
          <v-text-field
            v-model="search"
            focused
            clearable
            @keyup.enter.prevent="searchGameName"
            label="Busca tus juegos..."
          >
          </v-text-field>
        </v-col>
        <v-col cols="12" sm="12" md="2" lg="2">
          <v-btn class="button" rounded="xs" @click="searchGameName">
            Buscar
            <span class="material-icons" id="iconCross">close</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>
    <v-card-text v-show="pages !== 0" style="height: 70vw">
      <v-row>
        <v-col cols="12" sm="6" md="4" v-for="(game, idx) in games" :key="idx">
          <GameCard :game="game"></GameCard>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions v-if="games.length">
      <v-container>
        <v-row justify="space-around">
          <v-col cols="2">
            <v-btn
              v-show="page != 1"
              class="button"
              rounded="xs"
              @click="changePage(page - 1)"
            >
              Back
              <span class="material-icons" id="iconTriangle"
                >change_history</span
              >
            </v-btn>
          </v-col>
          <v-col cols="2"> {{ this.page }} / {{ Math.ceil(pages) }} </v-col>
          <v-col cols="2">
            <v-btn
              v-show="page != Math.ceil(pages)"
              class="button"
              rounded="xs"
              @click="changePage(page + 1)"
            >
              Next
              <span class="material-icons" id="iconCircle"
                >radio_button_unchecked</span
              >
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
    <v-divider></v-divider>
  </v-card>

  <!-- <v-container class="search">
    <v-row >
      <v-col cols="12" sm="12" md="10" lg="10">
        <v-text-field
          v-model="search"
          focused
          clearable
          @keyup.enter.prevent="searchGameName"
          label="Busca tus juegos..."
        >
        </v-text-field>
      </v-col>
      <v-col cols="12" sm="12" md="2" lg="2">
        <v-btn class="button" rounded="xs" @click="searchGameName">
          Buscar
          <span class="material-icons" id="iconCross">close</span>
        </v-btn>
      </v-col>
    </v-row>
<v-container class="result">
    <v-row>
      <v-col cols="12" sm="6" md="4" v-for="(game, idx) in games" :key="idx">
        <GameCard :game="game" ></GameCard>
      </v-col>
    </v-row>
    <div v-if="games.length" class="text-center">
      <v-btn
        v-show="page != 1"
        class="button"
        rounded="xs"
        @click="changePage(page - 1)"
      >
        Back
        <span class="material-icons" id="iconTriangle">change_history</span>
      </v-btn>
      {{ this.page }} / {{ Math.ceil(pages) }}
      <v-btn
        v-show="page != Math.ceil(pages)"
        class="button"
        rounded="xs"
        @click="changePage(page + 1)"
      >
        Next
        <span class="material-icons" id="iconCircle"
          >radio_button_unchecked</span
        >
      </v-btn>
    </div>
  </v-container>
  </v-container> -->
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
    pages: 0,
  }),
  methods: {
    async searchGameName() {
      const response = await api.getGameByName(this.search);
      this.listCount = response.count;
      this.games = response.results;
      this.next = response.next;
      this.pages = response.count / 40;
      if (this.listCount < this.pagesize) {
        this.historyList = this.games;
      }
    },
    async changePage(page) {
      this.page = page >= 0 || page > this.pages ? this.page : page;
      const response = await api.getGameByName(this.search, page);
      this.games = response.results;
      this.next = response.next;
      this.page = page;
      window.scrollTo(0, 0);
    },
  },
  components: {
    GameCard,
  },
};
</script>

<style scoped>
.search {
  background-color: #a1acb4;
  width: 80vw;
}
.result {
  background-color: #3e5161;
}
.button {
  background-color: #3e5161;
  color: #a1acb4;
  box-shadow: inset 0 4px 5px 0 #a1acb48d, 0 5px 10px 1px #000;
}

.button:active {
  box-shadow: inset 0 5px 6px 5px #000, 0 0 0 0;
}

#iconTriangle {
  color: #38dec6;
}
#iconCircle {
  color: #ef6f69;
}

#iconCross {
  color: #9cade2;
}
</style>
