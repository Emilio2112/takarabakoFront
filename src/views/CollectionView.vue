<template>
  <v-container>
    <div v-if="loading">
      <Loader></Loader>
    </div>
    <div v-else>
      My Collection
    <Collection v-if="games.length > 0" :games="games"></Collection>
    <h3 v-else style="line-height: normal" class="ma-4">Search your games and add them to your collection</h3>
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
    const result = await usersAPI.viewCollection();
    this.games = result;
    this.loading = false
    this.listView = true;
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
    Collection,
    Loader
  },
};
</script>

<style scoped>
.card {
  background-color: #76858f;
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
