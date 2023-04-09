<template>
  <v-container v-if="loading">
    <Loader></Loader>
  </v-container>
  <v-container v-else>
    <v-row justify="end">
      <v-col>
        <v-img :src="game.background_image">
          <v-container>
            <v-row justify="end">
              <v-card color="#9e9e9e70">
                <v-card-title> Rating </v-card-title>
                <v-card-text>
                  <h1 class="rating font-weight-black text-center">
                    {{ game.rating }}
                  </h1>
                  <h3 class="rating">/5</h3>
                </v-card-text>
              </v-card>
            </v-row>
          </v-container>
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>
          {{ game.name }}
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h4>Original name: {{ game.name_original }}</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Released: {{ game.released }}</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-chip
          class="chip ma-1"
          variant="elevated"
          v-for="(platform, idx) in game.platforms"
          :key="idx"
          size="x-large"
        >
          {{ platform.platform.name }}
        </v-chip>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-sheet
        rounded
        class="pa-6 mx-auto" color="#76858F">
          <p>
          {{ game.description }}
        </p>
        </v-sheet>
      </v-col>
    </v-row>
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-btn class="button" rounded="xs" @click="addGameToPlayingList()">
          Playing
          <span class="material-icons" id="iconCross">close</span>
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <ButtonBack></ButtonBack>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ButtonBack from "../components/ButtonBack.vue";
import usersAPI from "../services/users";
import gamesAPI from "../services/games";
import Loader from "../components/Loader.vue";

export default {
  data() {
    return {
      game: {},
      loading: true
    };
  },
  async created() {
    this.game = await gamesAPI.getGame(this.$route.params.id);
    this.loading = false
    this.game.description = this.game.description
      .replace(/(<([^>]+)>)/gi, "")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&#039;/g, "'")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&");
    let res =
      this.game.rating.reduce((acc, cur) => acc + cur) /
      this.game.rating.length;
    if (res % 1 === 0) {
      this.game.rating = res;
    } else {
      this.game.rating = res.toFixed(1);
    }
    this.game.released = this.game.released.slice(0, 10);
  },
  methods: {
    async addGameToPlayingList() {
      const response = await usersAPI.addGameToPlaying(this.game._id);
    },
  },
  components: {
    ButtonBack,
    Loader
},
};
</script>

<style scoped>
.rating {
  display: inline;
}
.chip {
  color: #a1acb4;
  background-color: #3e5161;
}

.button {
  background-color: #3e5161;
  color: #a1acb4;
  box-shadow: inset 0 4px 5px 1px #a1acb48d, 0 5px 10px 1px #000;
}

.button:active {
  box-shadow: inset 0 5px 6px 5px #000, 0 0 0 0;
}
#iconCross {
  color: #9cade2;
}
</style>
