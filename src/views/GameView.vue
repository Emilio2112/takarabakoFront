<template>
  <v-container v-if="loading">
    <Loader></Loader>
  </v-container>
  <v-container v-else>
    <v-row>
      <v-col>
        <v-img :src="game.background_image"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>{{ game.name }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h3 v-if="game.released">{{ game.released }}</h3>
        <h3 v-else>No released date</h3>
      </v-col>
    </v-row>
    <v-row v-if="game.website">
      <v-col>
        <a 
          :href="game.website"
          style="text-decoration: none"
          target="_blank"
          rel="noopener noreferrer"
          >{{ game.name }} <v-icon icon="mdi-web"></v-icon
        ></a>
      </v-col>
    </v-row>
    <v-row>
      <v-col> Original name: {{ game.name_original }} </v-col>
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
      <v-col cols="2" align-self="center">
        <v-img src="../metascore.png" aspect-ratio="1"></v-img>
      </v-col>
      <v-col cols="2" align-self="center">
        <a
          :href="game.metacritic_url"
          style="text-decoration: none"
          target="_blank"
          rel="noopener noreferrer"
          ><h1>{{ game.metacritic }}</h1></a
        >
      </v-col>
      <v-col cols="3" v-if="!game.esrb_rating">
        <v-img src="../Rating_Pending.png" aspect-ratio="1"></v-img>
      </v-col>
      <v-col cols="3" v-else-if="game.esrb_rating.id === 1">
        <v-img src="../Everyone.png" aspect-ratio="1"></v-img>
      </v-col>
      <v-col cols="3" v-else-if="game.esrb_rating.id === 2">
        <v-img src="../Everyone_10+.png" aspect-ratio="1"></v-img>
      </v-col>
      <v-col cols="3" v-else-if="game.esrb_rating.id === 3">
        <v-img src="../Teen.png" aspect-ratio="1"></v-img>
      </v-col>
      <v-col cols="3" v-else-if="game.esrb_rating.id === 4">
        <v-img src="../Mature.png" aspect-ratio="1"></v-img>
      </v-col>
      <v-col cols="3" v-else-if="game.esrb_rating.id === 5">
        <v-img src="../Adults_Only_18+.png" aspect-ratio="1"></v-img>
      </v-col>
      <v-col cols="3" v-else-if="game.esrb_rating.id === 0">
        <v-img src="../Rating_Pending.png" aspect-ratio="1"></v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col> </v-col>
    </v-row>
    <v-row v-if="screenshots">
      <v-col cols="12">
        <v-slide-group class="pa-4" center-active mandatory show-arrows>
          <v-slide-group-item
            v-for="(screenshot, idx) in screenshots"
            :key="idx"
            v-slot="{ isSelected, toggle }"
          >
            <v-img
              :src="screenshot.image"
              class="ma-4"
              :width="isSelected ? 300 : 150"
              @click="toggle"
            >
              <v-container>
                <v-row align-content="end">
                  <v-col align-self="end">
                    <v-btn
                      v-if="isSelected"
                      density="compact"
                      icon="mdi-fullscreen"
                      :href="screenshot.image"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
    </v-row>
    <!-- <v-row v-if="screenshots">
      <v-col>
        <v-carousel>
          <v-carousel-item v-for="(screenshot, idx) in screenshots" :key="idx">
            <v-img :src="screenshot.image"></v-img
          ></v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row> -->
    <v-row>
      <v-col>
        {{ descriptionFixed }}
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          v-if="!store.token"
          class="button"
          rounded="xs"
          @click="goToLogin"
        >
          Login
          <span class="material-icons" id="iconCross">close</span>
        </v-btn>
        <v-btn
          v-else-if="gameAddedToCollection"
          class="button"
          rounded="xs"
          @click="addGame"
          v-show="added"
        >
          Añadir
          <span class="material-icons" id="iconCross">close</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiRAWG from "../services/rawg";
import gamesAPI from "../services/games";
import usersAPI from "../services/users";
import Loader from "../components/Loader.vue";
import { useAuthStore } from "../stores/auth";

export default {
  name: "GameView",
  data() {
    return {
      game: {},
      added: true,
      screenshots: {},
      loading: true,
      store: useAuthStore(),
      collection: {},
      list: [],
    };
  },
  async created() {
    this.game = await apiRAWG.getOneGame(this.$route.params.id);
    this.screenshots = await apiRAWG.getGameScreenshots(this.$route.params.id);
    if (this.store.token) {
      this.collection = await usersAPI.viewCollection();
    }
    this.loading = false;
  },
  async updated() {
    this.game = await apiRAWG.getOneGame(this.$route.params.id);
    this.screenshots = await apiRAWG.getGameScreenshots(this.$route.params.id);
    if (this.store.token) {
      this.collection = await usersAPI.viewCollection();
    }
    this.loading = false;
  },
  computed: {
    descriptionFixed() {
      return (this.game.description = this.game.description
        .replace(/(<([^>]+)>)/gi, "")
        .replace(/&gt;/g, ">")
        .replace(/&lt;/g, "<")
        .replace(/&#039;/g, "'")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, "&"));
    },
    gameAddedToCollection() {
      for (const idGame of this.collection) {
        this.list.push(idGame.id);
      }
      if (this.list.includes(this.game.id)) {
        return (this.added = false);
      } else {
        return (this.added = true);
      }
    },
  },
  methods: {
    async addGame() {
      const response = await gamesAPI.addGame(this.game);
      if (response._id !== undefined) {
        const res = await usersAPI.addGameToCollection(response._id);
        this.added = false;
      } else {
        this.added = false;
      }
    },
    goToLogin() {
      this.$router.push({ name: "login" });
    },
  },
  components: {
    Loader,
  },
};
</script>

<style scoped>
.button {
  background-color: #3e5161;
  color: #a1acb4;
  box-shadow: inset 0 4px 5px 1px #a1acb48d, 0 5px 10px 1px #000;
}

.button:active {
  box-shadow: inset 0 5px 6px 5px #000, 0 0 0 0;
}
.chip {
  color: #a1acb4;
  background-color: #3e5161;
}
.metalogo {
  height: 25px;
}
#iconCross {
  color: #9cade2;
}
</style>
