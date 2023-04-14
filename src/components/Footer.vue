<template>
  <v-footer class="footer" color="#3E5161">
    <v-row justify="center">
      <div class="px-4">
        <a href="https://www.linkedin.com/in/emilio-casado/" style="text-decoration: none" target="_blank" rel="noopener noreferrer">
        <v-btn icon="mdi-linkedin" variant="text" density="comfortable">
            <v-icon color="#A1ACB4"></v-icon>
        </v-btn>
    </a>

      </div>
      <div class="px-4">
        <a href="mailto: piconto12@gmail.com" style="text-decoration: none" target="_blank" rel="noopener noreferrer">
        <v-btn icon="mdi-email" variant="text" density="comfortable">
            <v-icon color="#A1ACB4"></v-icon>
        </v-btn>
    </a>
      </div>
      <div class="px-4">
      <a href="https://github.com/Emilio2112" style="text-decoration: none" target="_blank" rel="noopener noreferrer">
        <v-btn icon="mdi-github" variant="text" density="comfortable">
            <v-icon color="#A1ACB4"></v-icon>
        </v-btn>
    </a>
      </div>
      <div class="px-4">
        
        <v-btn icon="mdi-pac-man" variant="text" density="comfortable" @click="dialog=true">
            <v-icon color="#FFFF00"></v-icon>
        </v-btn>
      </div>
      <v-dialog
      v-model="dialog"
      width="auto">
      <v-card color="#76858F">
        <v-card-text class="card text-center">
            <p>THANKS to <a href="https://www.fulp.es/" style="text-decoration: none" target="_blank" rel="noopener noreferrer">FULP</a></p>
        </v-card-text>
        <v-card-text class="text-center">
            <p>Special thanks to <a href="https://reboot.academy/" style="text-decoration: none" target="_blank" rel="noopener noreferrer">Reboot Academy</a></p>
        </v-card-text>
      </v-card>
    
    </v-dialog>
      <v-col cols="12" class="text-center mt-3">
        <div>
          All games information provided by
          <a href="https://rawg.io/" style="text-decoration: none" target="_blank" rel="noopener noreferrer">RAWG</a>
        </div>
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
        dialog: false
    };
  },
};
</script>

<style scoped>
.footer {
    height: auto;
    font-size: 16px;
}
.card{
    animation:3s linear 1s infinite running slidein;
}
</style>
