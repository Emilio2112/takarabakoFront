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
  box-shadow: inset 0 4px 5px 1px #a1acb48d, 0 5px 10px 1px #000;
}

.button:active {
      box-shadow: inset 0 5px 6px 5px #000, 0 0 0 0;
    }
  #iconSquare {
      color: #D591BF
  }
  </style>