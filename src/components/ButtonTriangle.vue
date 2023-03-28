<template>
    <v-btn class="button" rounded="xs">
      {{name}}
      <span class="material-icons" id="icon">change_history</span>
    </v-btn>
  </template>
  
  <script>
  export default {
    name: "ButtonTriangle",
    data() {
        return {
        name: "triangle"
    }
    }
  };
  </script>
  
  <style scoped>
  .button {
    background-color: #3e5161;
    color: #a1acb4;
  }
  #icon {
      color: #38DEC6
  }
  </style>