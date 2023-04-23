<template>
  <Loader v-if="loading"></Loader>
  <v-container class="container" v-else fluid>
    <v-row v-if="timesCompleted !== 0">
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        {{ timesCompleted }}% of the players has completed {{ this.game.name }}
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col> No stats for this game </v-col>
    </v-row>
    <v-row justify="center" v-if="game.time.length > 0">
      <v-col cols="10" xs="10" sm="8" md="6" lg="6" xl="4" >
        <v-card class="d-flex flex-column mx-auto py-8 elevation-4" color="#3E5161" >
          <div class="d-flex justify-center mt-auto"><h3>Time Average</h3> </div>

          <div class="d-flex align-center flex-column my-auto">
            <div class="mt-5"><h2>{{ mediaTimes }} hours</h2></div>
            <div class="px-3">{{ game.time.length }} players</div>
          </div>

          <v-list
            bg-color="transparent"
            class="d-flex flex-column-reverse"
            density="compact"
          >
            <v-list-item v-for="(times, i) in timeValues" :key="i">
              <v-progress-linear
                :model-value="(times/game.time.length)*100"
                class="mx-n5"
                color="yellow-darken-3"
                height="20"
                rounded
              ></v-progress-linear>

              <template v-slot:prepend>
                <span class="mx-2">{{ i }}</span>
              </template>

              <template v-slot:append>
                <div class="rating-values">
                  <span class="d-flex justify-end"> {{ times }} </span>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="10" xs="10" sm="8" md="6" lg="6" xl="4">
        <v-card class="d-flex flex-column mx-auto py-8 elevation-4" color="#3E5161">
          <div class="d-flex justify-center mt-auto">
            <h3>Rating overview</h3>
          </div>

          <div class="d-flex align-center flex-column my-auto">
            <div class="mt-5">
              <h2>{{ ratingMedia }}</h2>
            </div>

            <v-rating
              :model-value="ratingMedia"
              color="yellow-darken-3"
              half-increments
              disabled
            ></v-rating>
            <div class="px-3">{{ game.rates.length }} ratings</div>
          </div>

          <v-list
            bg-color="transparent"
            class="d-flex flex-column-reverse"
            density="compact"
          >
            <v-list-item v-for="(rating, i) in ratingValues" :key="i">
              <v-progress-linear
                :model-value="(rating / game.rates.length) * 100"
                class="mx-n5"
                color="yellow-darken-3"
                height="20"
                rounded
              ></v-progress-linear>

              <template v-slot:prepend>
                <span>{{ i }}</span>
                <v-icon icon="mdi-star" class="mx-2"></v-icon>
              </template>

              <template v-slot:append>
                <div class="rating-values">
                  <span class="d-flex justify-end"> {{ rating }} </span>
                </div>
              </template>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import usersAPI from "../services/users";
import Loader from "./Loader.vue";

export default {
  data() {
    return {
    usersList: [],
    loading: true
    };
  },
  props: {
    game: Object,
  },
  async created() {
    this.usersList = await usersAPI.getAllUsers();
    this.loading = false
  },
  computed: {
    ratingMedia() {
      if (this.game.rates.length > 0) {
        let res =
          this.game.rates.reduce((acc, cur) => acc + cur) /
          this.game.rates.length;
        if (res % 1 === 0) {
          return res;
        } else {
          return res.toFixed(1);
        }
      }
    },
    ratingValues() {
      const sortedValues = this.game.rates.sort((a, b) => b - a);
      return sortedValues.reduce(
        (prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev),
        {}
      );
    },
    timesCompleted() {
      return ((this.game.time.length / this.usersList.length) * 100).toFixed(2);
    },
    mediaTimes() {
      return (
        this.game.time.reduce((prev, curr) => (curr += prev)) /
        this.game.time.length
      );
    },
    timeValues() {
      const sortedValues = this.game.time.sort((a, b) => b - a);
      return sortedValues.reduce(
        (prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev),
        {}
      );
    },

    usersHasCompletedMe() {
      let result = 0;
      let allGamesOfUsers = [];
      for (let e of this.usersList) {
        if (e.completed.length !== 0) {
          allGamesOfUsers.push(...e.games);
        }
      }
      allGamesOfUsers;
      for (let i = 0; i < allGamesOfUsers.length; i++) {
        if (this.game._id.toString() === allGamesOfUsers[i]) {
          result += 1;
        }
      }
      return result;
    },
  },
  components: {
    Loader
  }
};
</script>

<style scoped>
.container {
  background-color: #76858F;
}
.rating-values {
  width: 25px;
}
</style>
