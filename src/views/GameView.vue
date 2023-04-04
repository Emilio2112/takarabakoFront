<template>
  <div>
    <h1>{{ game.name }}</h1>
    <h3>{{ game.released }}</h3>
    <div>{{ removeTags }}</div>
    <div>
        <v-btn class="button" rounded="xs"  @click="addGame" v-show="added">
    Añadir
    <span class="material-icons" id="iconCross">close</span>
  </v-btn>
    </div>
  </div>
</template>

<script>
import apiRAWG from "../services/rawg";
import gamesAPI from "../services/games"
import usersAPI from "../services/users"

export default {
  name: "GameView",
  data() {
    return {
      game: {},
      added: true
    };
  },
  async created() {
    const result = await apiRAWG.getOneGame(this.$route.params.id)
    this.game = result;
  },
  async beforeUpdate() {
    const result = await apiRAWG.getOneGame(this.$route.params.id)
    this.game = result;
  },
  computed: {
    removeTags(str) {
        str = this.game.description
      return str.replace(/(<([^>]+)>)/gi, "");
    },
  },
  methods: {
    async addGame() {
        const response = await gamesAPI.addGame(this.game)
        if (response._id !== undefined) {
        const res = await usersAPI.addGameToCollection(response._id)
        this.added = false
    }else {
        this.added = false
    } 
    }
  }
};
</script>

<style scoped>

.button {
  background-color: #3e5161;
  color: #a1acb4;
  position: static;
}
#iconCross {
    color: #9CADE2
}</style>
