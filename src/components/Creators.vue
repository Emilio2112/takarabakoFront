<template>
  <v-container v-if="loading">
    <Loader></Loader>
  </v-container>
  <v-container v-else fluid class="container">
    <v-row>
      <v-col cols="12" sm="10" md="6" lg="6" xl="6" xxl="6" v-for="(creator, idx) in creators" :key="idx">
        <v-card max-width="600" elevation="20" >
          <v-img :src="creator.image_background" cover>
            <v-card-title class="title">
                <h2>{{creator.name}}</h2></v-card-title>
            <v-container>
              <v-row>
                <v-col cols="4" sm="4" md="5" lg="4" xl="4" xxl="4">
                  <v-avatar size="150" rounded="0">
                    <v-img v-if="creator.image" :src="creator.image" lazy-src="../public/blank"></v-img
                  >
                <v-img v-else src="/blank.webp"></v-img></v-avatar>
                  <v-list-item  color="white" ></v-list-item>
                </v-col>
                <v-col cols="8" sm="8" md="7" lg="8" xl="8" xxl="8">
                  <v-list-item v-for="(game, idx) in creator.games" :key="idx" color="white">
                   <h5>- {{ game.name }}</h5> 
                  </v-list-item>
                </v-col>
              </v-row>
            </v-container>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Loader from "./Loader.vue";
import apiRAWG from "../services/rawg";

export default {
  data() {
    return {
      creators: {},
      loading: true,
    };
  },
  props: {
    game: Object,
  },
  async created() {
    this.creators = await apiRAWG.getGameCreators(this.game.id);
    this.loading = false;
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

.title{
    color: white
}
</style>
