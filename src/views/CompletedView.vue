<template>
  <v-container>
    <div v-if="loading">
      <Loader></Loader>
    </div>
    <div v-else>
      Completed
      <Collection v-if="games.length > 0" :games="games"></Collection>
      <h3 v-else style="line-height: normal" class="ma-4">Here you can see your completed games</h3>
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
      loading: true,
    };
  },
  async created() {
    const result = await usersAPI.viewCompleted();
    this.loading = false
    this.games = result;
  },
  components: {
    ButtonBack,
    Collection,
    Loader,
  },
};
</script>

<style scoped></style>
