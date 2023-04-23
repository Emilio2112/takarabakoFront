<template>
  <v-container v-if="loading">
    <Loader></Loader>
  </v-container>
  <v-container  v-else>
    <v-row justify="end">
      <v-col>
        <v-img :src="game.background_image">
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
        <v-card color="#A1ACB4" flat>
          <v-tabs v-model="tab" align-tabs="end" bg-color="#76858F" grow>
            <v-tab :value="1">Information</v-tab>
            <v-tab :value="2">Stats</v-tab>
            <v-tab :value="3">Screenshots</v-tab>
            <v-tab :value="4">Creators</v-tab>
          </v-tabs>
          <v-window v-model="tab">
            <v-window-item :value="1">
              <GameData :game="game"></GameData>
            </v-window-item>
            <v-window-item :value="2">
              <Stats :game="game"></Stats>
            </v-window-item>
            <v-window-item :value="3">
              <ScreenshotsViewer :game="game"></ScreenshotsViewer>
            </v-window-item>
            <v-window-item :value="4">
              <Creators :game="game"></Creators>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="space-around">
      <v-col cols="auto">
        <v-btn
          v-if="isPlaying"
          class="button"
          rounded="xs"
          @click="addGameToPlayingList"
        >
          Playing
          <span class="material-icons" id="iconCross">close</span>
          <v-dialog activator="parent" width="auto">
            <v-card color="#76858F" class="pa-4">
              <v-card-text> Game added to playing list </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  class="button"
                  rounded="xs"
                  :to="{ name: 'collectionView' }"
                  >Close<span class="material-icons" id="iconTriangle"
                    >change_history
                  </span>
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-btn>
        <v-btn
          v-if="isCompleted"
          @click="addGameToCompletedList"
          class="button"
          rounded="xs"
          >Completed<span class="material-icons" id="iconSquare"
            >check_box_outline_blank
          </span>
          <v-dialog activator="parent" width="auto" persistent>
            <v-card color="#76858F" class="pa-4">
              <v-card-title>
                <h3 class="text-center">Game Completed!!!</h3>
              </v-card-title>
              <v-row justify="center">
                <v-col class="text-center"> Rating: </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-rating
                    v-model="finalRating"
                    color="#FFFF00"
                    hover
                    half-increments
                    size="x-large"
                  ></v-rating>
                </v-col>
              </v-row>
              <v-divider class="py-2"></v-divider>
              <v-row class="mb-4" justify="space-between">
                <v-col cols="12" class="text-center"> Time: </v-col>
                <v-col cols="2" class="pa-1">
                  <v-btn
                    size="small"
                    variant="text"
                    icon="mdi-minus"
                    @click="decrement"
                  ></v-btn>
                </v-col>
                <v-col cols="6">
                  <v-text-field v-model="finalTime"></v-text-field>
                </v-col>
                <v-col cols="2" class="pa-1">
                  <v-btn
                    size="small"
                    variant="text"
                    icon="mdi-plus"
                    @click="increment"
                  ></v-btn>
                </v-col>
              </v-row>
              <v-slider
                v-model="finalTime"
                track-color="grey"
                min="0"
                max="300"
                :step="1"
              >
              </v-slider>
              <v-divider class="py-2"></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  @click="insertStats"
                  class="button"
                  rounded="xs"
                  :to="{ name: 'collectionView' }"
                  >Close<span class="material-icons" id="iconTriangle"
                    >change_history</span
                  >
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
import authAPI from "../services/authService";
import usersAPI from "../services/users";
import gamesAPI from "../services/games";
import Loader from "../components/Loader.vue";
import confetti from "https://esm.run/canvas-confetti@1";
import ScreenshotsViewer from "../components/ScreenshotsViewer.vue";
import Stats from "../components/Stats.vue";
import GameData from "../components/GameData.vue";
import Creators from "../components/Creators.vue";
import { all } from "axios";

export default {
  data() {
    return {
      game: {},
      user: [],
      finalTime: null,
      finalRating: null,
      loading: true,
      showButtonPlaying: false,
      showButtonCompleted: false,
      tab: null,

      values: {},
    };
  },
  async created() {
    this.game = await gamesAPI.getGame(this.$route.params.id);
    this.user = await authAPI.getUser();

    this.loading = false;
  },
  methods: {
    async addGameToPlayingList() {
      await usersAPI.addGameToPlaying(this.game._id);
      this.showButtonPlaying = false;
      this.showButtonCompleted = true;
    },
    async addGameToCompletedList() {
      await usersAPI.addGameToCompleted(this.game._id);
      this.showButtonCompleted = false;
      confetti({
        particleCount: 150,
        spread: 60,
      });
    },
    async insertStats() {
      const res = await gamesAPI.updateGameStats(
        this.game._id,
        this.finalTime,
        this.finalRating
      );
    },
    decrement() {
      this.finalTime--;
    },
    increment() {
      this.finalTime++;
    },
  },
  computed: {
    isPlaying() {
      if (
        this.user.playing.includes(this.game._id) ||
        this.user.completed.includes(this.game._id)
      ) {
        this.showButtonPlaying = false;
        return this.showButtonPlaying;
      } else {
        this.showButtonPlaying = true;
        return this.showButtonPlaying;
      }
    },
    isCompleted() {
      if (
        this.user.completed.includes(this.game._id) === false &&
        this.user.playing.includes(this.game._id)
      ) {
        this.showButtonCompleted = true;
        return this.showButtonCompleted;
      } else {
        this.showButtonCompleted = false;
        return this.showButtonCompleted;
      }
    },
  },
  components: {
    ButtonBack,
    Loader,
    ScreenshotsViewer,
    Stats,
    GameData,
    Creators
  },
};
</script>

<style scoped>
.rating {
  display: inline;
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
#iconTriangle {
  color: #38dec6;
}
#iconSquare {
  color: #d591bf;
}
</style>
