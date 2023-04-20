<template>
  <v-container>
    <v-row class="pa-2" justify="space-between">
      <v-col cols="3" xs="3" md="6" lg="4">{{ games.length }} Games</v-col>
      <v-col cols="9" xs="9" md="3" lg="5">
        <div class="d-flex flex-column align-end">
          <v-btn-toggle elevation="4" mandatory>
            <v-btn
              class="button"
              color="#3e5161"
              icon="mdi-order-alphabetical-ascending"
              @click="alphaUpSort"
            ></v-btn>
            <v-btn
              class="button"
              color="#3e5161"
              icon="mdi-order-alphabetical-descending"
              @click="alphaDownSort"
            ></v-btn>
            <v-btn
              class="button"
              color="#3e5161"
              icon="mdi-sort-calendar-ascending"
              @click="dateUpSort"
            ></v-btn>
            <v-btn
              class="button"
              color="#3e5161"
              icon="mdi-sort-calendar-descending"
              @click="dateDownSort"
            ></v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
      <v-col cols="12" xs="12" md="3" lg="3">
        <div class="d-flex flex-column align-end">
          <v-btn-toggle elevation="4" mandatory>
            <v-btn
              class="button"
              color="#3e5161"
              icon="mdi-view-headline"
              value="List"
              @click="viewList"
            ></v-btn>
            <v-btn
              class="button"
              color="#3e5161"
              icon="mdi-view-module"
              value="Cards"
              @click="viewCard"
            ></v-btn>
          </v-btn-toggle>
        </div>
      </v-col>
    </v-row>
    <v-divider class="py-2"></v-divider>
    <Scrollbar class="pa-2" height="50vw" always>
      <v-container>
    <v-row class="pa-2" v-if="cardView">
      <v-col
        v-for="(game, idx) in filteredGames"
        :key="idx"
        cols="12"
        xs="12"
        sm="6"
        md="6"
        lg="4"
      >
        <v-card
          class="card"
          max-width="400"
          elevation="10"
          :to="{ name: 'gameCollectionView', params: { id: game._id } }"
        >
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
          v-for="(game, idx) in filteredGames"
          :key="idx"
          color="#76858F"
          elevation="10"
          class="ma-6"
          :to="{ name: 'gameCollectionView', params: { id: game._id } }"
        >
          <v-card-text>
            {{ game.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  </Scrollbar>
  <v-divider class="pa-2 ma-2"></v-divider>
  </v-container>
</template>

<script>

export default {
  data() {
    return {
      toggle: undefined,
      listView: true,
      cardView: false,
      ascending: true,
      alphabeticSort: true,
      dateSort: false,
    };
  },
  props: {
    games: Object,
  },
  computed: {
    filteredGames() {
      let tempGames = this.games
      tempGames = tempGames.sort((a, b) => {
        if (this.alphabeticSort) {
          let fa = a.name.toLowerCase();
          let fb = b.name.toLowerCase();
          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        }
        else if (this.dateSort) {
          let ida = a._id
          let idb = b._id
          if (ida < idb) {
            return -1
          }
          if (ida > idb) {
            return 1
          }
          return 0
        }
      });
      if (!this.ascending) {
        return tempGames.reverse();
      } else {
        return tempGames;
      }
    },
  },
  methods: {
    alphaUpSort() {
      this.alphabeticSort = true;
      this.dateSort = false;
      this.ascending = true;
    },
    alphaDownSort() {
      this.alphabeticSort = true;
      this.dateSort = false;
      this.ascending = false;
    },
    dateUpSort() {
      this.alphabeticSort = false
      this.dateSort = true
      this.ascending = true
    },
    dateDownSort() {
      this.alphabeticSort = false
      this.dateSort = true
      this.ascending = false
    },
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
.col {
  background-color: red;
}
.col2 {
  background-color: green;
}
.card {
  background-color: #76858f;
}

.title {
  background-color: #9e9e9e70;
}
.button {
  color: #a1acb4;
  background-color: #76858f;
}

#iconCircle {
  color: #ef6f69;
}

.chip {
  color: #a1acb4;
  background-color: #3e5161;
}
</style>
