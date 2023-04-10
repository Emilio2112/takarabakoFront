<template>
  <v-container>
    <div v-if="loading">
      <Loader></Loader>
    </div>
    <div v-else>
      Playing
      <Collection :games="games"></Collection>
      <v-row>
        <v-col>
          <ButtonBack></ButtonBack>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import usersAPI from "../services/users";
import ButtonBack from "../components/ButtonBack.vue";
import Collection from "../components/Collection.vue";
import Loader from "../components/Loader.vue";

export default {
  data() {
    return {
      games: {},
      loading: true
    };
  },
  async created() {
    const result = await usersAPI.viewPlaying();
    this.games = result;
    this.loading = false;
    this.listView = true;
  },
  components: {
    ButtonBack,
    Collection,
    Loader,
  },
};
</script>

<style scoped></style>
