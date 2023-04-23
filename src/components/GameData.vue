<template>
  <div>
    <v-container fluid>
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
            >{{ game.name }} <v-icon icon="mdi-web-cancel"></v-icon
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
        <v-col>
          <Scrollbar maxHeight="200px" always>
            <v-card color="#76858F">
              <p class="pa-3">{{ descriptionFixed }}</p>
            </v-card>
          </Scrollbar>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    game: Object,
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
};
</script>

<style lang="scss" scoped></style>
