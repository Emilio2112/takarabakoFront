<template>
  <v-container>
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
        <h3>{{ game.released }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <a href="game.website" style="text-decoration: none" target="_blank" rel="noopener noreferrer">{{ game.name }} <v-icon icon="mdi-web"></v-icon></a>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Original name: {{ game.name_original }}
      </v-col>
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
      <v-col>
        <a href="game.metacritic_url" style="text-decoration: none" target="_blank" rel="noopener noreferrer"> <v-img src="../public/metascore.jpg"> {{ game.metacritic }} </a>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Metacritic Score: {{ game.metacritic_url }}
      </v-col>
    </v-row>
    <v-row>
      {{ game.reactions }}
    </v-row>
    <v-row>
      <v-col>
        <p>{{ descriptionFixed }}</p>
      </v-col>
    </v-row>

      

        <v-btn class="button" rounded="xs" @click="addGame" v-show="added">
          Añadir
          <span class="material-icons" id="iconCross">close</span>
        </v-btn>

  </v-container>
</template>

<script>
import apiRAWG from "../services/rawg";
import gamesAPI from "../services/games";
import usersAPI from "../services/users";

export default {
  name: "GameView",
  data() {
    return {
      game: {},
      added: true,
    };
  },
  async created() {
    const result = await apiRAWG.getOneGame(this.$route.params.id);
    this.game = result;
    this.game.description = this.game.description.replace(/(<([^>]+)>)/gi, "");
  },
  async beforeUpdate() {
    const result = await apiRAWG.getOneGame(this.$route.params.id);
    this.game = result;
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
    },
  },
};
</script>

<style scoped>
.button {
  background-color: #3e5161;
  color: #a1acb4;
  position: static;
}
.chip {
  color: #a1acb4;
  background-color: #3e5161;
}

#iconCross {
  color: #9cade2;
}
</style>
