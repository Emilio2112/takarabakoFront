<template>
    <v-btn class="button" rounded="xs" @click="goBack">
      Volver
      <span class="material-icons" id="iconCircle">radio_button_unchecked</span>
    </v-btn>
  </template>
  
  <script>
  export default {
    name: "ButtonCircle",
    methods: {
      goBack() {
      this.$router.go(-1);
    },
    }
    
  };
  </script>
  
  <style scoped>
.button {
  background-color: #3e5161;
  color: #a1acb4;
  box-shadow: inset 0 4px 5px 1px #a1acb48d, 0 5px 10px 1px #000;
}

.button:active {
      box-shadow: inset 0 5px 6px 5px #000, 0 0 0 0;
    }
  #iconCircle {
      color: #EF6F69
  }
  </style>