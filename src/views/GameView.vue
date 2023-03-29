<template>
  <div>
    <h1>{{ game.name }}</h1>
    <h3>{{ game.released }}</h3>
    {{ game.description }}
    <div>
        <v-btn class="button" rounded="xs">
    Añadir
    <span class="material-icons" id="iconCross" @click="addGame">close</span>
  </v-btn>
    </div>
  </div>
</template>

<script>
import api from "../services/rawg";
import API from "../services/games"

export default {
  name: "GameView",
  data() {
    return {
      game: {},
    };
  },
  async created() {
    const result = await api.getOneGame(this.$route.params.id);
    this.game = result;
  },
  /*computed: {
    removeTags(str) {
        str = this.game.description
      return str.replace(/(<([^>]+)>)/gi, "");
    },
  },*/
  methods: {
    async addGame() {
        const response = await API.addGame(this.game)
        console.log(response)
    }
  }
};
</script>

<style scoped>

.button {
  background-color: #3e5161;
  color: #a1acb4;
}
#iconCross {
    color: #9CADE2
}</style>
