<template>
  <v-btn class="button" rounded="xs">
    Cross
    <span class="material-icons" id="iconCross">close</span>
  </v-btn>
</template>

<script>
export default {
  name: "ButtonCross",
};
</script>

<style scoped>
.button {
  background-color: #3e5161;
  color: #a1acb4;
}
#iconCross {
    color: #9CADE2
}
</style>
