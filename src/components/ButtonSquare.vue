<template>
    <v-btn class="button" rounded="xs">
      Square
      <span class="material-icons" id="iconSquare">check_box_outline_blank</span>
    </v-btn>
  </template>
  
  <script>
  export default {
    name: "ButtonSquare",
  };
  </script>
  
  <style scoped>
  .button {
    background-color: #3e5161;
    color: #a1acb4;
  }
  #iconSquare {
      color: #D591BF
  }
  </style>