<template>
  <v-container fluid>
    <v-row v-if="timesCompleted !== 0">
      <v-col cols="10" xs="10" sm="8" md="6" lg="6" xl="4">
        {{ timesCompleted }}% has completed {{ this.game.name }}
      </v-col>
      <v-col cols="10" xs="10" sm="8" md="6" lg="6" xl="4">
        Hours Average {{ mediaTimes }}
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col> No stats for this game </v-col>
    </v-row>
    <v-row justify="center" v-if="game.time.length > 0">
      <v-col cols="10" xs="10" sm="8" md="6" lg="6" xl="4">
        <v-card class="d-flex flex-column mx-auto py-8">
          <div class="d-flex justify-center mt-auto text-h5">Time Average</div>

          <div class="d-flex align-center flex-column my-auto">
            <div class="text-h2 mt-5">{{ mediaTimes }} hours</div>
            <div class="px-3">{{ game.time.length }} players</div>
          </div>

          <v-list
            bg-color="transparent"
            class="d-flex flex-column-reverse"
            density="compact"
          >
            <v-list-item v-for="(times, i) in timeValues" :key="i">
              <v-progress-linear
                :model-value="times"
                class="mx-n5"
                color="yellow-darken-3"
                height="20"
                rounded
              ></v-progress-linear>

              <template v-slot:prepend>
                <span>{{ i }}</span>
                <v-icon icon="mdi-star" class="mx-3"></v-icon>
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
      <v-col cols="12" xs="10" sm="8" md="6" lg="6" xl="4">
        <v-card class="d-flex flex-column mx-auto py-8">
          <div class="d-flex justify-center mt-auto text-h5">
            Rating overview
          </div>

          <div class="d-flex align-center flex-column my-auto">
            <div class="text-h2 mt-5">
              {{ ratingMedia }}
              <span class="text-h6 ml-n3">/5</span>
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
                :model-value="(rating / 5) * 100"
                class="mx-n5"
                color="yellow-darken-3"
                height="20"
                rounded
              ></v-progress-linear>

              <template v-slot:prepend>
                <span>{{ i }}</span>
                <v-icon icon="mdi-star" class="mx-3"></v-icon>
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

export default {
  data() {
    return {
    usersList: []
    };
  },
  props: {
    game: Object,
  },
  async created() {
    this.usersList = await usersAPI.getAllUsers();
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
      return (this.game.time.length / this.usersList.length) * 100;
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
};
</script>

<style lang="scss" scoped></style>
