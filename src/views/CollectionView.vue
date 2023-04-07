<template>
  <v-container>
    <v-row justify="space-between">
      <v-col cols="6">Mi colección<br />{{ games.length }} juegos</v-col>
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
    <v-row v-if="listView">
      <v-col
        v-for="(game, idx) in games"
        :key="idx"
        cols="12"
        sm="6"
        md="4"
        lg="4"
      >
        <v-card class="card" max-width="400" elevation="20">
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
    <v-row v-else>
      <v-col cols="12" xs="6" sm="6" md="6" lg="6" max-width="400">
        <v-card class="list"
          color="#76858F"
          elevation="20"
          v-for="(game, idx) in games"
          :key="idx"
        >
          <v-card-text>
            {{ game.name }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <ButtonBack></ButtonBack>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import usersAPI from "../services/users";
import ButtonBack from "../components/ButtonBack.vue";

export default {
  data() {
    return {
      games: {},
      toggle: undefined,
      listView: true,
      cardView: false,
    };
  },
  async created() {
    const result = await usersAPI.viewCollection();
    this.games = result;
  },
  methods: {
    viewList() {
      if (this.listView === true) {
        this.listView = false;
        this.cardView = true;
      }
    },
    viewCard() {
      if (this.cardView === true) {
        this.cardView = false;
        this.listView = true;
      }
    },
  },
  components: {
    ButtonBack,
  },
};
</script>

<style scoped>
.card {
  background-color: #76858f;
}

.list{
    margin-bottom: 4%;
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
