<template>
    <v-container>
      <v-row justify="space-between">
        <v-col cols="6">{{ games.length }} Games</v-col>
        <v-col cols="4">
          <div class="d-flex flex-column align-center">
            <v-btn-toggle v-model="toggle" mandatory>
              <v-btn
                class="button"
                icon="mdi-view-headline"
                value="List"
                @click="viewList"
              ></v-btn>
              <v-btn
                class="button"
                icon="mdi-view-module"
                value="Cards"
                @click="viewCard"
              ></v-btn>
            </v-btn-toggle>
          </div>
        </v-col>
      </v-row>
      <v-row v-if="cardView">
        <v-col
          v-for="(game, idx) in games"
          :key="idx"
          cols="12"
          xs="12"
          sm="8"
          md="6"
          lg="4"
        >
          <v-card class="card" max-width="400" elevation="20" :to="{name: 'gameCollectionView', params: {id: game._id}}" >
            <v-img
              :src="game.background_image"
              class="align-end text-white"
              height="200"
              cover
            >
              <v-card-title class="title">
                {{ game.name }}
              </v-card-title>
            </v-img>
            <v-card-text>
              <v-chip
                class="chip ma-1"
                variant="elevated"
                v-for="(platform, idx) in game.platforms"
                :key="idx"
              >
                {{ platform.platform.name }}
              </v-chip>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center" v-else>
        <v-col cols="12" xs="6" sm="8" md="8" lg="6">
          <v-card
          v-for="(game, idx) in games"
            :key="idx"
            color="#76858F"
            elevation="20"
            class="ma-6"
            :to="{name: 'gameCollectionView', params: {id: game._id}}" >
            <v-card-text>
              {{ game.name }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        toggle: undefined,
        listView: true,
        cardView: false,
      };
    },
    props: {
        games: Object
    },
    methods: {
      viewList() {
        if (this.listView === false) {
          this.listView = true;
          this.cardView = false;
        }
      },
      viewCard() {
        if (this.cardView === false) {
          this.cardView = true;
          this.listView = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .card {
    background-color: #76858f;
  }
  
  .title {
    background-color: #9e9e9e70;
  }
  .button {
    background-color: #3e5161;
    color: #a1acb4;
    box-shadow: inset 0 4px 5px 1px #a1acb48d, 0 5px 10px 1px #000;
  }
  
  .button:active {
    box-shadow: inset 0 5px 6px 5px #000, 0 0 0 0;
  }
  #iconCircle {
    color: #ef6f69;
  }
  
  .chip {
    color: #a1acb4;
    background-color: #3e5161;
  }
  </style>
  