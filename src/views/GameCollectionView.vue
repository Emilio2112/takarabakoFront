<template>
  <v-container>
    <v-row justify="end">
      <v-col>
        <v-img :src="game.background_image">
          <v-container>
            <v-row justify="end">
              <v-card color="#9e9e9e70">
                <v-card-title> Rating </v-card-title>
                <v-card-text>
                  <h1 class="rating font-weight-black text-center">
                    {{ game.rating }} 
                  
                  </h1><h3 class="rating">/5</h3>
                </v-card-text>
              </v-card>
            </v-row>
          </v-container>
        </v-img>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h1>
          {{ game.name }}
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h4>Original name: {{ game.name_original }}</h4>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <h2>Released: {{ game.released }}</h2>
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
      <v-col >
        {{ game.description }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gamesAPI from "../services/games";
export default {
  data() {
    return {
      game: {},
    };
  },
  async created() {
    this.game = await gamesAPI.getGame(this.$route.params.id);
    this.game.description = this.game.description.replace(/(<([^>]+)>)/gi, "")
    let res= this.game.rating.reduce((acc,cur)=> acc+cur) / this.game.rating.length
    if (res % 1 === 0) {
    this.game.rating = res
  } else {
    this.game.rating =  res.toFixed(1)
  }
    this.game.released = this.game.released.slice(0,10)
  }
};
</script>

<style scoped>
.rating{
    display: inline;
}
.chip {
  color: #a1acb4;
  background-color: #3e5161;
}
</style>
