<template>
    <v-btn class="button" rounded="xs">
      {{name}}
      <span class="material-icons" id="iconTriangle">change_history</span>
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
  box-shadow: inset 0 4px 5px 1px #a1acb48d, 0 5px 10px 1px #000;
}

.button:active {
      box-shadow: inset 0 5px 6px 5px #000, 0 0 0 0;
    }
  #iconTriangle {
      color: #38DEC6
  }
  </style>