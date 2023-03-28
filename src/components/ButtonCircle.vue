<template>
    <v-btn class="button" rounded="xs">
      Circle
      <span class="material-icons" id="iconCircle">radio_button_unchecked</span>
    </v-btn>
  </template>
  
  <script>
  export default {
    name: "ButtonCircle",
  };
  </script>
  
  <style scoped>
  .button {
    background-color: #3e5161;
    color: #a1acb4;
  }
  #iconCircle {
      color: #EF6F69
  }
  </style>