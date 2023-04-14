<template>
  <v-footer class="footer" color="#3E5161">
    <v-row justify="center">
      <div class="px-4 mt-2">
        <a href="https://www.linkedin.com/in/emilio-casado/" style="text-decoration: none" target="_blank" rel="noopener noreferrer">
        <v-btn icon="mdi-linkedin" variant="text" density="comfortable">
            <v-icon color="#A1ACB4"></v-icon>
        </v-btn>
    </a>

      </div>
      <div class="px-4 mt-2">
        <a href="mailto: piconto12@gmail.com" style="text-decoration: none" target="_blank" rel="noopener noreferrer">
        <v-btn icon="mdi-email" variant="text" density="comfortable">
            <v-icon color="#A1ACB4"></v-icon>
        </v-btn>
    </a>
      </div>
      <div class="px-4 mt-2">
      <a href="https://github.com/Emilio2112" style="text-decoration: none" target="_blank" rel="noopener noreferrer">
        <v-btn icon="mdi-github" variant="text" density="comfortable">
            <v-icon color="#A1ACB4"></v-icon>
        </v-btn>
    </a>
      </div>
      <div class="px-4 mt-2">
        
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
     <v-container><v-row justify="center"><div class='pac-man'></div></v-row></v-container>

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

.card{
    animation:3s linear 1s infinite running slidein;
}

.pac-man {
  border-radius: 50%;
  margin: 0 auto;
  margin-bottom: 1em;
  border-radius: 100em 100em 0 0;
  background: #f00;
  transform-origin: bottom;
  -webkit-animation: eating-top 0.5s infinite;
          animation: eating-top 0.5s infinite;
}
.pac-man,
.pac-man::before {
  width: 70px;
  height: calc(70px/2);
  background: #FFFF00;
}
.pac-man::before {
  content: '';
  display: block;
  margin-top: calc(70px/2);
  position: absolute;
  transform-origin: top;
  border-radius: 0 0 100em 100em;
  transform: rotate(80deg);
  -webkit-animation: eating-bottom 0.5s infinite;
          animation: eating-bottom 0.5s infinite;
}
.pac-man::after {
  position: absolute;
  border-radius: 100em;
  content: '';
  display: block;
  height: 20px;
  width: 20px;
  margin-top: calc((70px / 2) - 10px);
  margin-left: calc((70px / 2) - 10px);
  transform-origin: center;
  -webkit-animation: center 0.5s infinite, ball 0.5s -0.33s infinite linear;
          animation: center 0.5s infinite, ball 0.5s -0.33s infinite linear;
}
@-webkit-keyframes eating-top {
  0% {
    transform: rotate(-40deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-40deg);
  }
}
@keyframes eating-top {
  0% {
    transform: rotate(-40deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-40deg);
  }
}
@-webkit-keyframes eating-bottom {
  0% {
    transform: rotate(80deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(80deg);
  }
}
@keyframes eating-bottom {
  0% {
    transform: rotate(80deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(80deg);
  }
}
@-webkit-keyframes center {
  0% {
    transform: rotate(40deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(40deg);
  }
}
@keyframes center {
  0% {
    transform: rotate(40deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(40deg);
  }
}
@-webkit-keyframes ball {
  0% {
    opacity: 0.7;
    box-shadow: 70px 0 0 0 #FFFF00, 120px 0 0 0 #FFFF00, 170px 0 0 0 #FFFF00, 220px 0 0 0 #FFFF00;
  }
  100% {
    box-shadow: 20px 0 0 0 #FFFF00, 70px 0 0 0 #FFFF00, 120px 0 0 0 #FFFF00, 170px 0 0 0 #FFFF00;
  }
}
@keyframes ball {
  0% {
    opacity: 0.7;
    box-shadow: 70px 0 0 0 #FFFF00, 120px 0 0 0 #FFFF00, 170px 0 0 0 #FFFF00, 220px 0 0 0 #FFFF00;
  }
  100% {
    box-shadow: 20px 0 0 0 #FFFF00, 70px 0 0 0 #FFFF00, 120px 0 0 0 #FFFF00, 170px 0 0 0 #FFFF00;
  }
}

</style>
