<template>
  <Loader v-if="loading"></Loader>
  <v-container v-else class="container" fluid>
    <v-row>
      <v-col cols="12">
        <v-slide-group center-active mandatory show-arrows>
          <v-slide-group-item
            v-for="(screenshot, idx) in screenshots"
            :key="idx"
            v-slot="{ isSelected, toggle }"
          >
            <v-img
              :src="screenshot.image"
              class="ma-4"
              :width="isSelected ? 300 : 150"
              @click="toggle"
            >
              <v-container>
                <v-row align-content="end">
                  <v-col align-self="end">
                    <v-btn
                      v-if="isSelected"
                      density="compact"
                      icon="mdi-fullscreen"
                      @click="overlay = !overlay"
                    >
                    </v-btn>
                    <v-dialog v-model="overlay">
                      <v-carousel>
                        <v-carousel-item
                          v-for="(screenshot, idx) in screenshots"
                          :key="idx"
                          :src="screenshot.image"
                        >
                        </v-carousel-item>
                      </v-carousel>

                      <div></div>
                    </v-dialog>
                  </v-col>
                </v-row>
              </v-container>
            </v-img>
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
      screenshots: {},
      loading: true,
      overlay: false,
    };
  },
  props: {
    game: Object,
  },
  async created() {
    this.screenshots = await apiRAWG.getGameScreenshots(this.game.id);
    this.loading = false;
  },
  components: {
    Loader,
  },
};
</script>

<style scoped>
.container {
  background-color: #76858F;
}
</style>
