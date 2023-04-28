<template>
  <Loader v-if="loading"></Loader>
  <v-container class="container" v-else fluid>
    <v-row>
      <v-col>
        <h3 v-if="game.released">{{ releasedDate }}</h3>
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
      <v-col cols="3" sm="2" md="2" lg="2" xl="1" xxl="1" align-self="center">
        <v-img src="../metascore.png" aspect-ratio="1"></v-img>
      </v-col>
      <v-col cols="3" align-self="center">
        <a  v-if="game.metacritic"
          :href="game.metacritic_url"
          style="text-decoration: none"
          target="_blank"
          rel="noopener noreferrer"
          >
          <h1>{{ game.metacritic }}</h1></a
        >
        <h1 v-else>--</h1>
      </v-col>
      <v-spacer></v-spacer>
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
      <v-col>
        <Scrollbar maxHeight="200px" always>
          <v-card color="#A1ACB4">
            <p class="pa-3">{{ descriptionFixed }}</p>
          </v-card>
        </Scrollbar>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="series.length !== 0" cols="12">
        Other {{ game.name }} game series:
        <v-slide-group show-arrows>
          <v-slide-group-item
            v-for="(episode, idx) in series"
            :key="idx"
          >
            <v-card width="200" height="100" class="ma-2" :to="{name: 'gameview', params: {id: episode.id}}">
              <v-img :src="episode.background_image" cover>
                <v-card-title class="title">
                  {{ episode.name }}
                </v-card-title></v-img
              >
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import apiRAWG from "../services/rawg";
import Loader from "./Loader.vue";

export default {
  data() {
    return {
      series: {},
      loading: true,
    };
  },
  props: {
    game: Object,
  },
  async created() {
    this.series = await apiRAWG.getGameSeries(this.game.id);
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
    releasedDate() {
      return (this.game.released = this.game.released.slice(0, 10));
    },
  },
  components: {
    Loader,
  },
};
</script>

<style scoped>
.container {
  background-color: #76858f;
}
.chip {
  color: #a1acb4;
  background-color: #3e5161;
}
.title{
    color: white;
    background-color: #9e9e9e70
}
</style>
