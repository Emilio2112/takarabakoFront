<template>
    <v-btn class="button" rounded="xs">
      Square
      <span class="material-icons" id="icon">check_box_outline_blank</span>
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
  #icon {
      color: #D591BF
  }
  </style>